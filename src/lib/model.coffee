class Model
  constructor: (tableName, @connection)->
    @tab = @connection(tableName)

  save: (data)->
    data.created_at = new Date() if not data.created_at
    @tab.insert(data)

  update: (data, where)->
    data.updated_at = new Date() if not data.updated_at
    r = @tab.update(data)
    return r if not where
    r.where.apply(@tab, where)

  find: (fileds, where)->
    return @tab.select() if not fileds
    sql =  @tab.select.apply @tab, fileds
    return sql if not where
    return sql.where.apply @tab, where

  findOne: (fileds, where)->
    @find(fileds, where).limit(1).then((r)-> r[0])

  sql: (sql, fileds)->
    return @connection.raw(sql) if not fileds
    @connection.raw sql, fileds

  delOne: (key, value)->
    @tab.where(key, value).del()

  delMul: (key, valueArr)->
    valueArr = [].concat(valueArr)
    @tab.whereIn(key, valueArr).del()

  table: -> @tab

module.exports = Model