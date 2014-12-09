_path = require 'path'
_knex = require 'knex'
_Schema = require './schema'

class Coal
  constructor: (@config)->
    @initConnection(@config.database)

  initConnection: (config)->
    @dbConnection = _knex(config)

  prepareSchema: ->
    schemaDir = _path.join process.cwd(), @config.schema
    new _Schema(@dbConnection, schemaDir)

  getConnection: ->
    @dbConnection

module.exports = Coal