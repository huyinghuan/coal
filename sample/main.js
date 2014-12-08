(function() {
  var _Coal, _coal, _config;

  _Coal = require('../lib/index');

  _config = require('./config');

  _coal = new _Coal(_config);

  _coal.prepareSchema();

}).call(this);
