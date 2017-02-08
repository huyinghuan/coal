_path = require 'path'
_table_struct = require './table-struct'
class Model
  constructor: (@tableName, @connection, @developer)->
    @schema =  _table_struct[@tableName]

  save: (data)->
    tab = @table()
    data.create_at = Date.now() if @schema.auto_create_at and not data.create_at
    sql = tab.insert(@clearSchema(data))
    console.log sql.toString() if @developer
    sql

  clearSchema: (data)->
    fields = @schema.fields or {}
    result = {}
    for key, value of fields
      result[key] = data[key] if data[key]?
    result

  saveArray: (data)->
    queue = []
    for item in data
      item.create_at = Date.now() if @schema.auto_create_at and not item.create_at
      queue.push(@clearSchema(item))
    sql = @table().insert(queue)
    console.log sql.toString() if @developer
    sql

  update: (key, data)->
    tab = @table()
    data.update_at = Date.now() if @schema.auto_update_at and not data.update_at
    sql = tab.update(@clearSchema(data)).where(key, data[key])
    console.log sql.toString() if @developer
    sql

  sql: (sql, fields)->
    pro = if not fields then @connection.raw(sql) else @connection.raw sql, fields
    console.log sql.toString() if @developer
    pro

  table: -> @connection(@tableName)

module.exports = Model