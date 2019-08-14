const koa = require('koa')
const koaCompress = require('koa-compress')
const port = 8419

const assetMiddleware = require('./middleware/assetMiddleware')

module.exports = function() {
  const app = new koa()

  app.use(koaCompress())
  app.use(assetMiddleware())

  app.listen(port, () => {
    console.log(`✨ 服务已启动 http://localhost:${port}`)
  })
}
