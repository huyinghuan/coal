class Model
  constructor: (tableName, connection)->
    @tab = connection(tableName)

  save: (data)->
    data.create_at = new Date() if not data.create_at
    @tab.insert(data)

  update: (data, where)->
    data.updated_at = new Date() if not data.updated_at
    r = @tab.update(data)
    return r if not where
    r.where.apply(@tab, where)

  find: (fileds, where)->
    @tab.select()

  del: ()->

  table: -> @tab

module.exports = Model