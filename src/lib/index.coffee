_path = require 'path'
_knex = require 'knex'
_Schema = require './schema'
_Model = require './model'

class Coal
  constructor: (@config, updateSchema = false)->
    @initConnection(@config.database)
    @prepareSchema() if updateSchema

  initConnection: (config)->
    @dbConnection = _knex(config)

  prepareSchema: ()->
    schemaDir = @config.schema
    new _Schema(@dbConnection, schemaDir)

  getConnection: ->
    @dbConnection

  Model: (tabName, developer = false)->
    new _Model(tabName, @dbConnection, developer)


module.exports = Coal