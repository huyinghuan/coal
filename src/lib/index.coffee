_path = require 'path'
_knex = require 'knex'
_sload = require 'sload'
_Schema = require './schema'
_Model = require './model'
_table_struct = require './table-struct'

class Coal
  constructor: (@config, updateSchema = false)->
    @initConnection(@config.database)
    @prepareSchema() #if updateSchema
    @prepareTableStruct()

  initConnection: (config)->
    @dbConnection = _knex(config)

  prepareSchema: ()->
    schemaDir = @config.schema
    @tableSchema = new _Schema(@dbConnection, schemaDir)

  prepareTableStruct: ->
    schemaDir = @config.schema
    schemas = _sload.scan schemaDir
    for schema in schemas
      _table_struct[schema.name] = schema

  getConnection: ->
    @dbConnection

  Model: (tabName, developer = false)->
    new _Model(tabName, @dbConnection, developer)

  #清洗数据
  clearFields: (tabName, beClearData)->
    @tableSchema.clearSchema(tabName, beClearData)


module.exports = Coal