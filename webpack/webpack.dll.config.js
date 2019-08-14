const root = process.cwd()
const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const LIBRARY_NAME = '__[name]_[chunkhash]__'

const pathConfig = {
  root: root,
  dll: path.resolve(root, './.temp/dll'),
  nodeModule: path.resolve(root, './node_modules')
}

const webpackConfig = {
  mode: 'production',
  entry: {
    vendor: ['preact']
  },
  output: {
    filename: `js/[name].[chunkhash].js`,
    path: pathConfig.dll,
    publicPath: '/',
    library: LIBRARY_NAME
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [pathConfig.nodeModule]
  },
  resolveLoader: {
    modules: [pathConfig.nodeModule]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // new webpack.ProgressPlugin((percentage, message, ...args) => {
    //   console.info(percentage, message, ...args)
    // }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [pathConfig.dll]
    }),
    new webpack.DllPlugin({
      path: `${pathConfig.dll}/[name].json`,
      name: LIBRARY_NAME
    }),
    new AssetsWebpackPlugin({
      path: pathConfig.dll,
      filename: 'index.json',
      prettyPrint: true
    })
  ],
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        uglifyES: {
          compress: {
            warnings: false,
            drop_console: true
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

module.exports = webpackConfig
