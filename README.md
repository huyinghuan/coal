coal
----------------
  Base on [knexjs](http://knexjs.org) ORM


## Install

```shell
npm install coal --save
```

## Getting start


### database configure

configure.coffee

```coffeescript
module.exports =
  database:
    client: 'mysql'
    connection:
      host: 'localhost'
      user: 'root'
      password: '123456'
      database: 'test_coal'
  schema: 'schame'
```

create tables

```coffeescript
Coal = require 'coal'
config = require './config'
coal = new Coal(config)
_coal.prepareSchema()
```

## Sample

see the directory ```sample```

## LICENSE

MIT

## History

v0.0.1

  init coal