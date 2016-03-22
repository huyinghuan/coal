exports.mysql =
  database:
    client: 'mysql'
    connection:
      host: 'localhost'
      user: 'root'
      password: '123456'
      database: 'test_coal'
  schema: 'schema'

exports.sqlite3 =
  database:
    client: 'sqlite3',
    connection: filename: "./my.sqlite"
  schema: 'schema'
