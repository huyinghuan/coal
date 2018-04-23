coal
----------------
  Base on [knexjs](http://knexjs.org)


## Install

```shell
npm install coal --save
```

## Getting start


### database configure

config.js

```javascript
exports.database = {
  client: "mysql",
  connection:{
    host : 'localhost',
    user : 'root',
    password : '12345678',
    database : 'page-monitor'
  },
  debug: false
}
```

schema:

```javascript
exports.schema = {
  id: "increments primary",
  name: "string",
  url:"string",
}
```

init tables

```javascript
Coal = require('coal')
config = require('./config')
await Coal.init(_config.database)
await Coal.createTable([schema])
```

## Get  knexjs instance

```
Coal.get()
```
