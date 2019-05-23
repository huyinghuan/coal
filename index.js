const _knex = require('knex');
const _fs = require('fs')

function getPropMap(prop){
  let reg = /\((.+)\)/
  let macth = prop.match(reg)
  if(!macth){
    return {
      name: prop
    }
  }
  return {name: prop.replace(macth[0], ""), value:macth[1]}
}

class Database{
  constructor(config){
    this.knex = _knex(config)
  }
  Get(){
    return this.knex
  }
  async checkHeartBeat() {
    const dbCheckResult = await (async ()=>{
      return this.knex.raw("select 1")
        .then(() => { return {isOk: true};})
        .catch((e) => {return {isOk: false,error: e};});
    })()
    if (dbCheckResult.isOk === false) {
      console.log('DB connection error: ', dbCheckResult.error);
      process.exit(1)
    }
    console.log('DB connected!')
  }
  async createTable(schema){
    let tableName = schema.name
    let fields = schema.fields
    return this.knex.schema.createTable(tableName, (table)=>{
      for(let key in fields){
        let columnProps = fields[key].split(' ')
        let chain = null
        columnProps.forEach((prop, index)=>{
          let propMap = getPropMap(prop)
          if(index == 0){
            chain = table[propMap.name](key, propMap.value)
          }else{
            chain[propMap.name](propMap.value)
          }
        })
      }
    })
  }
  async alertTable(schema){
    let tableName = schema.name
    let fields = schema.fields
    for(let key in fields){
      let exists = await this.knex.schema.hasColumn(tableName, key)
      if(exists){
        continue
      }
      await this.knex.schema.table(tableName, (table)=>{
        let columnProps = fields[key].split(' ')
        let chain = null
        columnProps.forEach((prop, index)=>{
          let propMap = getPropMap(prop)
          if(index == 0){
            chain = table[propMap.name](key, propMap.value)
          }else{
            chain[prop]()
          }
        })
      })
    }
  }
  async initTable(schema){
    let tableName = schema.name
    let hasTable = await this.knex.schema.hasTable(tableName)
    if(!hasTable){
      await this.createTable(schema)
    }else{
      await this.alertTable(schema)
    }
  }
}

var conn = null

exports.init = async function(config){
  conn = new Database(config)
  await conn.checkHeartBeat()
}
exports.createTable = function(tableList){
  return Promise.all(tableList.map(async (table)=>{
    return conn.initTable(table)
  }))
}
exports.get = function(){
  return conn.Get()
}