(function() {
  var People, coal, connectMysql, connectSQLite, sql, sql2, _Coal, _config;

  _Coal = require('../lib/index');

  _config = require('./config');

  connectMysql = function() {
    return new _Coal(_config.mysql, true);
  };

  connectSQLite = function() {
    return new _Coal(_config.sqlite3, true);
  };

  coal = connectSQLite();

  People = coal.Model('people');

  sql = People.find(['*']);

  console.log(sql.toString());

  sql.then(function(r) {
    return console.log(r);
  });

  sql2 = People.find(['*']);

  console.log(sql2.toString());

  sql2.then(function(r) {
    return console.log(r);
  });

}).call(this);
