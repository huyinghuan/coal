class Model
  constructor: (@tableName, @connection, @developer)->

  save: (data)->
    tab = @table()
    data.created_at = new Date() if not data.created_at
    sql = tab.insert(data)
    console.log sql.toString() if @developer
    sql

  update: (data, where)->
    tab = @table()
    data.updated_at = new Date() if not data.updated_at
    r = tab.update(data)
    if where
      r.where.apply(tab, where)
    console.log r.toString() if @developer
    r


  find: (fileds, where)->
    tab = @table()
    return tab.select() if not fileds
    sql =  tab.select.apply tab, fileds
    if where
     sql = sql.where.apply tab, where
    console.log sql.toString() if @developer
    sql

  findOne: (fileds, where)->
    @find(fileds, where).limit(1).then((r)-> r[0])

  sql: (sql, fileds)->
    return @connection.raw(sql) if not fileds
    @connection.raw sql, fileds

  delOne: (key, value)->
    tab = @table()
    sql = tab.where(key, value).del()
    console.log sql.toString() if @developer
    sql

  delMul: (key, valueArr)->
    tab = @table()
    valueArr = [].concat(valueArr)
    sql = tab.whereIn(key, valueArr).del()
    console.log sql.toString() if @developer
    sql

  table: -> @connection(@tableName)

module.exports = Model