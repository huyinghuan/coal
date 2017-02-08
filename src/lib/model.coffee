_path = require 'path'
_table_struct = require './table-struct'
class Model
  constructor: (@tableName, @connection, @developer)->
    @schema =  _table_struct[@tableName]

  save: (data)->
    tab = @table()
    data.create_at = Date.now() if @schema.auto_create_at and not data.create_at
    sql = tab.insert(@schema.clearSchema(@tableName, data))
    console.log sql.toString() if @developer
    sql

  saveArray: (data)->
    queue = []
    for item in data
      item.create_at = Date.now() if @schema.auto_create_at and not item.create_at
      queue.push(@schema.clearSchema(@tableName, item))
    sql = tab.insert(queue)
    console.log sql.toString() if @developer
    sql

  update: (key, data)->
    tab = @table()
    data.update_at = Date.now() if @schema.auto_update_at and not data.update_at
    sql = tab.update(@schema.clearSchema(@tableName, data)).where(key, data[key])
    console.log sql.toString() if @developer
    sql

  sql: (sql, fields)->
    pro = if not fields then @connection.raw(sql) else @connection.raw sql, fields
    console.log sql.toString() if @developer
    pro

  table: -> @connection(@tableName)

module.exports = Model