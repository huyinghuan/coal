#建表
_async= require 'async'
_sload = require 'sload'
_Log = info: (msg)-> console.log msg

class Schema
  constructor: (@connection, @schemaDir)->
    @init()

  init: ->
    schemas = @scanSchema()
    @buildSchema schema for schema in schemas

  scanSchema: ->
    _sload.scan @schemaDir

  buildSchema: (schema)->
    name = schema.name
    fields = schema.fields
    self = @
    @connection.schema.hasTable(name).then (exists)->
      if exists
        self.updateSchema name, fields
      else
        self.createSchema name, fields

  #更新表字段
  updateSchema: (name, fields)->
    _Log.info "--- Update table #{name} begin..."
    conn = @connection
    queue = []
    queue.push({key: key, value: value}) for key, value of fields

    _async.whilst(
      ()-> return queue.length
    ,(cb)->
      column = queue.pop()
      conn.schema.hasColumn(name, column.key).then(
        (exists)->
          return cb() if exists
          conn.schema.table(name, (table)->
            table[column.value] column.key
            _Log.info "update #{column.key} success"
            cb()
          )
      )
    ,(err)->
      _Log.info "--- Update table #{name} finish."
    )
  #创建表
  createSchema: (name, fields)->
    _Log.info "Create #{name} begin !"
    @connection.schema.createTable(name, (table)->
      _Log.info "Create #{name} success !"
      table.increments('id').primary()
      table[value] key for key, value of fields
      table.bigInteger 'timestamp'
    )

module.exports = Schema