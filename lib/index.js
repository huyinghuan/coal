(function() {
  var Coal, _Model, _Schema, _knex, _path;

  _path = require('path');

  _knex = require('knex');

  _Schema = require('./schema');

  _Model = require('./model');

  Coal = (function() {
    function Coal(config) {
      this.config = config;
      this.initConnection(this.config.database);
      this.prepareSchema();
    }

    Coal.prototype.initConnection = function(config) {
      return this.dbConnection = _knex(config);
    };

    Coal.prototype.prepareSchema = function() {
      var schemaDir;
      schemaDir = _path.join(process.cwd(), this.config.schema);
      return new _Schema(this.dbConnection, schemaDir);
    };

    Coal.prototype.getConnection = function() {
      return this.dbConnection;
    };

    Coal.prototype.Model = function(tabName) {
      return new _Model(tabName, this.dbConnection);
    };

    return Coal;

  })();

  module.exports = Coal;

}).call(this);
