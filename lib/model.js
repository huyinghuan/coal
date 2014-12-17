(function() {
  var Model;

  Model = (function() {
    function Model(tableName, connection, developer) {
      this.tableName = tableName;
      this.connection = connection;
      this.developer = developer;
    }

    Model.prototype.save = function(data) {
      var sql, tab;
      tab = this.table();
      if (!data.created_at) {
        data.created_at = new Date();
      }
      sql = tab.insert(data);
      if (this.developer) {
        console.log(sql.toString());
      }
      return sql;
    };

    Model.prototype.update = function(data, where) {
      var r, tab;
      tab = this.table();
      if (!data.updated_at) {
        data.updated_at = new Date();
      }
      r = tab.update(data);
      if (where) {
        r.where.apply(tab, where);
      }
      if (this.developer) {
        console.log(r.toString());
      }
      return r;
    };

    Model.prototype.find = function(fileds, where) {
      var sql, tab;
      tab = this.table();
      if (!fileds) {
        return tab.select();
      }
      sql = tab.select.apply(tab, fileds);
      if (where) {
        sql = sql.where.apply(tab, where);
      }
      if (this.developer) {
        console.log(sql.toString());
      }
      return sql;
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
      var sql, tab;
      tab = this.table();
      sql = tab.where(key, value).del();
      if (this.developer) {
        console.log(sql.toString());
      }
      return sql;
    };

    Model.prototype.delMul = function(key, valueArr) {
      var sql, tab;
      tab = this.table();
      valueArr = [].concat(valueArr);
      sql = tab.whereIn(key, valueArr).del();
      if (this.developer) {
        console.log(sql.toString());
      }
      return sql;
    };

    Model.prototype.table = function() {
      return this.connection(this.tableName);
    };

    return Model;

  })();

  module.exports = Model;

}).call(this);
