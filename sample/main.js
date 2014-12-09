(function() {
  var People, coal, connectMysql, connectSQLite, delMulTest, delOneTest, saveTest, updateTest, _Coal, _config;

  _Coal = require('../lib/index');

  _config = require('./config');

  connectMysql = function() {
    return new _Coal(_config.mysql);
  };

  connectSQLite = function() {
    return new _Coal(_config.sqlite3);
  };

  coal = connectSQLite();

  People = coal.Model('people');


  /*
    Select Test
   */


  /*
    Insert Test
   */

  saveTest = function() {
    return People.save({
      name: "Test Save"
    }).exec(function() {
      return console.log("save success");
    });
  };


  /*
    Update Test
   */

  updateTest = function() {
    return People.update({
      name: "Test update"
    }, ["id", "=", 2]).exec(function() {
      return console.log("update success");
    });
  };


  /*
    Delete Test
   */

  delOneTest = function() {
    return People.delOne("id", 1).then(function() {
      return console.log("delOne success");
    });
  };

  delMulTest = function() {
    return People.delMul("id", [2, 3]).exec(function() {
      return console.log("delMul success");
    });
  };

}).call(this);
