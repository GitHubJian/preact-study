const { NODE_ENV = 'development' } = process.env

module.exports =
  NODE_ENV === 'development' ? require('./dev') : require('./main')
