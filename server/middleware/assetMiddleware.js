const root = process.cwd()
const path = require('path')
const koaSend = require('koa-send')
const fse = require('fs-extra')

const pathConfig = {
  global: path.resolve(root, './src/global'),
  static: path.resolve(root, './static'),
  dll: path.resolve(root, './.temp/dll')
}

module.exports = function(config, app) {
  return async (ctx, next) => {
    let reqPath = ctx.path
    let filePathOpposite

    let maxage = 365 * 24 * 60 * 60 * 1000

    if (reqPath.startsWith('/pages/')) {
      filePathOpposite = reqPath.substring('/pages/'.length) + '.html'
    } else {
      filePathOpposite = reqPath.substring('/static/'.length)
    }
    // change URL to local
    let filePath = path.resolve(pathConfig.static, `./${filePathOpposite}`)

    const exists = await fse.pathExists(filePath)

    let result
    if (exists) {
      result = await koaSend(ctx, filePathOpposite, {
        root: pathConfig.static,
        maxage
      })
    }

    if (!result) {
      await next()
    }
  }
}
