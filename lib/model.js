(function() {
  var Model;

  Model = (function() {
    function Model(tableName, connection) {
      this.connection = connection;
      this.tab = this.connection(tableName);
    }

    Model.prototype.save = function(data) {
      if (!data.created_at) {
        data.created_at = new Date();
      }
      return this.tab.insert(data);
    };

    Model.prototype.update = function(data, where) {
      var r;
      if (!data.updated_at) {
        data.updated_at = new Date();
      }
      r = this.tab.update(data);
      if (!where) {
        return r;
      }
      return r.where.apply(this.tab, where);
    };

    Model.prototype.find = function(fileds, where) {
      var sql;
      if (!fileds) {
        return this.tab.select();
      }
      sql = this.tab.select.apply(this.tab, fileds);
      if (!where) {
        return sql;
      }
      return sql.where.apply(this.tab, where);
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
      return this.tab.where(key, value).del();
    };

    Model.prototype.delMul = function(key, valueArr) {
      valueArr = [].concat(valueArr);
      return this.tab.whereIn(key, valueArr).del();
    };

    Model.prototype.table = function() {
      return this.tab;
    };

    return Model;

  })();

  module.exports = Model;

}).call(this);
