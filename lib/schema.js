(function() {
  var Schema, _Log, _async, _sload;

  _async = require('async');

  _sload = require('sload');

  _Log = {
    info: function(msg) {
      return console.log(msg);
    }
  };

  Schema = (function() {
    function Schema(connection, schemaDir) {
      this.connection = connection;
      this.schemaDir = schemaDir;
      this.init();
    }

    Schema.prototype.init = function() {
      var schema, schemas, _i, _len, _results;
      schemas = this.scanSchema();
      _results = [];
      for (_i = 0, _len = schemas.length; _i < _len; _i++) {
        schema = schemas[_i];
        _results.push(this.buildSchema(schema));
      }
      return _results;
    };

    Schema.prototype.scanSchema = function() {
      return _sload.scan(this.schemaDir);
    };

    Schema.prototype.buildSchema = function(schema) {
      var fields, name, self;
      name = schema.name;
      fields = schema.fields;
      self = this;
      return this.connection.schema.hasTable(name).then(function(exists) {
        if (exists) {
          return self.updateSchema(name, fields);
        } else {
          return self.createSchema(name, fields);
        }
      });
    };

    Schema.prototype.updateSchema = function(name, fields) {
      var conn, key, queue, value;
      _Log.info("--- Update table " + name + " begin...");
      conn = this.connection;
      queue = [];
      for (key in fields) {
        value = fields[key];
        queue.push({
          key: key,
          value: value
        });
      }
      return _async.whilst(function() {
        return queue.length;
      }, function(cb) {
        var column;
        column = queue.pop();
        return conn.schema.hasColumn(name, column.key).then(function(exists) {
          if (exists) {
            return cb();
          }
          return conn.schema.table(name, function(table) {
            table[column.value](column.key);
            _Log.info("update " + column.key + " success");
            return cb();
          });
        });
      }, function(err) {
        return _Log.info("--- Update table " + name + " finish.");
      });
    };

    Schema.prototype.createSchema = function(name, fields) {
      _Log.info("Create " + name + " begin !");
      return this.connection.schema.createTable(name, function(table) {
        var key, value;
        _Log.info("Create " + name + " success !");
        table.increments();
        for (key in fields) {
          value = fields[key];
          table[value](key);
        }
        return table.timestamps();
      });
    };

    return Schema;

  })();

  module.exports = Schema;

}).call(this);
