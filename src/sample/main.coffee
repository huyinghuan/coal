_Coal = require '../lib/index'
_config = require './config'

connectMysql = ->
  new _Coal(_config.mysql)

connectSQLite = ->
  new _Coal(_config.sqlite3)

coal = connectSQLite()

People = coal.Model('people')

#People.find().then((result)-> console.log result)
#tab = People.table()
#sql = tab.select.apply(tab, ['*'])
#sql.then((cols)-> console.log cols)

People.update({name: "test-update"}, ['id', '=', 1]).then((r)->
  console.log r
)