(function() {
  var People, coal, connectMysql, connectSQLite, delMulTest, delOneTest, saveTest, updateTest, _Coal, _config;

  _Coal = require('../lib/index');

  _config = require('./config');

  connectMysql = function() {
    return new _Coal(_config.mysql, true);
  };

  connectSQLite = function() {
    return new _Coal(_config.sqlite3, true);
  };

  coal = connectSQLite();

  People = coal.Model('people', true);


  /*
    Select Test
   */

  People.find().then(function(r) {
    return console.log(r);
  });


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

  saveTest();


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

  delOneTest = function(id) {
    return People.delOne("id", id).then(function() {
      return console.log("delOne success");
    });
  };

  delMulTest = function() {
    return People.delMul("id", [2, 3]).exec(function() {
      return console.log("delMul success");
    });
  };

}).call(this);
