_Coal = require '../lib/index'
_config = require './config'

connectMysql = ->
  new _Coal(_config.mysql, true)

connectSQLite = ->
  new _Coal(_config.sqlite3, true)

coal = connectSQLite()

People = coal.Model('people')

###
  Select Test
###

# pass
# People.sql("select * from people").then((r)-> console.log r)

#pass
People.find(['id', 'name']).then((result)-> console.log result)

#pass
#People.find(['id', 'name'], ['id', '=', 1]).then((result)-> console.log result)

#pass
#People.findOne().then((r)-> console.log r)

###
  Insert Test
###

#pass
saveTest = ->
  People.save(name: "Test Save").exec(()-> console.log "save success")

#saveTest()

###
  Update Test
###

#pass
updateTest = ->
  People.update(name: "Test update", ["id", "=", 2])
    .exec(()-> console.log "update success")

#updateTest()

###
  Delete Test
###

#pass
delOneTest = ->
  People.delOne("id", 1).then(()-> console.log "delOne success")

#DelOneTest()

#pass
delMulTest = ->
  People.delMul("id", [2, 3])
    .exec(()-> console.log "delMul success")

#delMulTest()