const root = process.cwd()
const path = require('path')
const pathConfig = {
  global: path.resolve(root, './src/global'),
  static: path.resolve(root, './static'),
  dll: path.resolve(root, './.temp/dll')
}
const { NODE_ENV } = process.env

const webpack = require('webpack')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const webpackDevMiddleware = require('webpack-dev-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const { hotMiddleware } = require('koa-webpack-middleware')
const koaSend = require('koa-send')
const fse = require('fs-extra')

const webpackConfig = require('../../webpack/webpack.dev.config')
const { htmlAssets: assets } = require('../../webpack/utils/assets')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(webpackConfig.output.path, file), 'utf-8')
  } catch (e) {}
}
const clone = v => JSON.parse(JSON.stringify(v))
const templateFilePath = path.resolve(root, './webpack/template/csr.ejs')

module.exports = function(config, app) {
  const webpackConfigEntry = clone(webpackConfig.entry)
  const htmlPathPrefix = '/pages'

  webpackConfig.entry = {
    global: [pathConfig.global]
  }
  const compilerPublicPath = '/static/'
  const compiler = webpack(webpackConfig)
  const devInstance = webpackDevMiddleware(compiler, {
    publicPath: compilerPublicPath,
    stats: webpackConfig.stats
  })

  const devInstancePromise = function(entryKey) {
    return new Promise((resolve, reject) => {
      devInstance.waitUntilValid(stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))

        if (stats.errors.length) {
          reject(stats)
        } else {
          let html = devInstance.fileSystem.readFileSync(
            path.join(webpackConfig.output.path, `${entryKey}.html`),
            'utf-8'
          )

          resolve(html)
        }
      })
    })
  }

  app.use(async (ctx, next) => {
    // /pages/news/1
    let reqPath = ctx.path
    let entryKey = reqPath.substring(htmlPathPrefix.length + 1)

    if (webpackConfigEntry[entryKey]) {
      try {
        const entryValue = [
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
          webpackConfigEntry[entryKey]
        ]

        compiler.apply(new MultiEntryPlugin(root, entryValue, entryKey))

        compiler.apply(
          new HtmlWebpackPlugin({
            filename: path.resolve(pathConfig.static, `${entryKey}.html`),
            title: ' 测试',
            template: templateFilePath,
            chunks: ['global', entryKey],
            NODE_ENV
          })
        )

        compiler.apply(
          new HtmlWebpackIncludeAssetsPlugin({
            append: false,
            assets: assets
          })
        )

        devInstance.invalidate()

        let html = await devInstancePromise(entryKey)

        ctx.body = html
      } catch (ex) {
        debugger
      }
    } else {
      await next()
    }
  })

  app.use(async (ctx, next) => {
    ctx.status = 200

    await devInstance(ctx.req, ctx.res, async () => {
      await next()
    })
  })

  app.use(async (ctx, next) => {
    let reqPath = ctx.path
    if (reqPath === '/__webpack_hmr') {
      await next()
    } else {
      let maxage = 365 * 24 * 60 * 60 * 1000

      // change URL to local
      let filePathOpposite = reqPath.substring(compilerPublicPath.length)
      let filePath = path.resolve(pathConfig.dll, `./${filePathOpposite}`)

      const exists = await fse.pathExists(filePath)
      let result
      if (exists) {
        result = await koaSend(ctx, filePathOpposite, {
          root: pathConfig.dll,
          maxage
        })
      }

      if (!result) {
        await next()
      }
    }
  })

  app.use(hotMiddleware(compiler))
}
