const koa = require('koa')
const port = 8419
const hmrMiddleware = require('./middleware/hmrMiddleware')

module.exports = function() {
  const app = new koa()

  hmrMiddleware(null, app)

  app.listen(port, () => {
    console.log(`✨ 服务已启动 http://localhost:${port}`)
  })
}
