coal
----------------
  ORM Base on [knexjs](http://knexjs.org)


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

init tables

```coffeescript
Coal = require 'coal'
config = require './config'
coal = new Coal(config, true)
```

> you need install database driver like: npm install mysql or npm install sqlite3

## API

### Coal(config, isBuildTable)

@config:  the database config.
@isBuildTable: Is auto update table or create table. default is false.

> if use in product environment, please init database schema structure at first.
> and then set isBuildTable as false.

> if you are developing, set it be true. let coal auto check the schema change, and
> apply in database.

### coal.prepareSchema()

build table use schemas and check the schema change then apply in database.

if in product, just run once. use combine with ```Coal(config, isBuildTable)```


### coal.Model(tableName)

return an instance of Model.

### Model.save(obj)

return promises

### Model.sql(sql)

param ```sql``` is a sql string. like ```select * from people```

return promises

### Model.table()

return a knex instance.

## Sample

see the directory ```sample```

## LICENSE

MIT

## History
v0.2.1

1. add clear Data

```coal.clearFields(tableName, beClearData)```

v0.2.0

1. delete update, delOne, delMul. just reserve ```sql```, ```save```, ```update``` and ```table```

2. remove auto add ```create_at``` and ```update_at``` field for every table. change to config in schema

3. update depend package


v0.0.2

  support simple operate function. like: save, update, delOne, delMul, sql and so on

v0.0.1

  init coal
