_Coal = require '../lib/index'
_config = require './config'

connectMysql = ->
  new _Coal(_config.mysql, true)

connectSQLite = ->
  new _Coal(_config.sqlite3, true)

coal = connectSQLite()

People = coal.Model('people')



sql = People.find(['*'])
console.log sql.toString()
sql.then((r)-> console.log r)

sql2 = People.find(['*'])
console.log sql2.toString()
sql2.then((r)-> console.log r)