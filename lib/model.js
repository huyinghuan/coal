(function() {
  var Model;

  Model = (function() {
    function Model(tableName, connection) {
      this.tableName = tableName;
      this.connection = connection;
    }

    Model.prototype.save = function(data) {
      var tab;
      tab = this.table();
      if (!data.created_at) {
        data.created_at = new Date();
      }
      return tab.insert(data);
    };

    Model.prototype.update = function(data, where) {
      var r, tab;
      tab = this.table();
      if (!data.updated_at) {
        data.updated_at = new Date();
      }
      r = tab.update(data);
      if (!where) {
        return r;
      }
      return r.where.apply(tab, where);
    };

    Model.prototype.find = function(fileds, where) {
      var sql, tab;
      tab = this.table();
      if (!fileds) {
        return tab.select();
      }
      sql = tab.select.apply(tab, fileds);
      if (!where) {
        return sql;
      }
      return sql.where.apply(tab, where);
    };

    Model.prototype.findOne = function(fileds, where) {
      return this.find(fileds, where).limit(1).then(function(r) {
        return r[0];
      });
    };

    Model.prototype.sql = function(sql, fileds) {
      if (!fileds) {
        return this.connection.raw(sql);
      }
      return this.connection.raw(sql, fileds);
    };

    Model.prototype.delOne = function(key, value) {
      var tab;
      tab = this.table();
      return tab.where(key, value).del();
    };

    Model.prototype.delMul = function(key, valueArr) {
      var tab;
      tab = this.table();
      valueArr = [].concat(valueArr);
      return tab.whereIn(key, valueArr).del();
    };

    Model.prototype.table = function() {
      return this.connection(this.tableName);
    };

    return Model;

  })();

  module.exports = Model;

}).call(this);
