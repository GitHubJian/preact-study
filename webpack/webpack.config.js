const root = process.cwd()
const path = require('path')
const { NODE_ENV } = process.env

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const AssetsWebpackPlugin = require('assets-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pathConfig = {
  static: path.resolve(root, './static'),
  dll: path.resolve(root, './.temp/dll'),
  global: path.resolve(root, './src/global')
}

const { htmlAssets } = require('./utils/assets.js')

const entry = require('./utils/entry')

const HtmlWebpackPluginList = Object.entries(entry).map(([k, v]) => {
  // 自动追加 webpack.output.publicPath 为 prefix
  return new HtmlWebpackPlugin({
    filename: path.resolve(pathConfig.static, `${k}.html`),
    template: path.resolve(__dirname, './template/csr.ejs'),
    title: '测试',
    favicon: pathConfig.favicon,
    chunks: ['global', k],
    NODE_ENV,
    inject: 'body',
    chunksSortMode: 'dependency',
    minify: {
      // removeComments: true, //移除HTML中的注释
      // collapseWhitespace: true, //删除空白符与换行符
      // 为了使GAEA能正确识别script, 保留引号
      // removeAttributeQuotes: true,
      // minifyJS: true,
      // removeScriptTypeAttributes: true,
      // removeStyleLinkTypeAttributes: true
    }
  })
})

module.exports = {
  mode: 'production',
  entry: Object.assign({ global: pathConfig.global }, entry),
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: pathConfig.static,
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      '@components': path.resolve(root, './components')
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat'
    },
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']],
              plugins: [
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'h'
                  }
                ],
                ['@babel/plugin-proposal-export-namespace-from'],
                ['@babel/plugin-proposal-export-default-from']
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.ProgressPlugin((percentage, message, ...args) => {
    //   console.info(percentage, message, ...args)
    // }),
    new webpack.DefinePlugin({
      'process.env.buildTime': JSON.stringify(Date.now())
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.ProvidePlugin({
      qs: 'query-string',
      axios: 'axios'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(`${pathConfig.dll}/vendor.json`)
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [pathConfig.static]
    }),
    new CopyWebpackPlugin([
      {
        from: pathConfig.dll,
        to: pathConfig.static
      }
    ]),
    // new AssetsWebpackPlugin({
    //   path: pathCfg.dist,
    //   filename: 'csr.assets.json',
    //   prettyPrint: true
    // }),
    ...HtmlWebpackPluginList,
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      assets: htmlAssets
    }),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6
      }
    })
  ],
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        uglifyES: {
          compress: {
            warnings: false,
            drop_console: NODE_ENV == 'production'
          }
        },
        exclude: ['vendor.js'],
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名
        cssProcessor: require('cssnano'), // 压缩和优化CSS 的处理器
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true // 在 console 中打印信息
      })
    ]
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false
  }
}
