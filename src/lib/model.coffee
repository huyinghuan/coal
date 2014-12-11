class Model
  constructor: (@tableName, @connection)->

  save: (data)->
    tab = @table()
    data.created_at = new Date() if not data.created_at
    tab.insert(data)

  update: (data, where)->
    tab = @table()
    data.updated_at = new Date() if not data.updated_at
    r = tab.update(data)
    return r if not where
    r.where.apply(tab, where)

  find: (fileds, where)->
    tab = @table()
    return tab.select() if not fileds
    sql =  tab.select.apply tab, fileds
    return sql if not where
    return sql.where.apply tab, where

  findOne: (fileds, where)->
    @find(fileds, where).limit(1).then((r)-> r[0])

  sql: (sql, fileds)->
    return @connection.raw(sql) if not fileds
    @connection.raw sql, fileds

  delOne: (key, value)->
    tab = @table()
    tab.where(key, value).del()

  delMul: (key, valueArr)->
    tab = @table()
    valueArr = [].concat(valueArr)
    tab.whereIn(key, valueArr).del()

  table: -> @connection(@tableName)

module.exports = Model