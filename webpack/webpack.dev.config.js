const root = process.cwd()
const path = require('path')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pathConfig = {
  static: path.resolve(root, './static'),
  dll: path.resolve(root, './.temp/dll'),
  global: path.resolve(root, './src/global')
}

const entry = require('./utils/entry')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: Object.assign({ global: pathConfig.global }, entry),
  output: {
    filename: 'js/[name].js',
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
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"',
      'process.env.buildTime': JSON.stringify(Date.now())
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
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
      filename: 'css/[name].csr.[contenthash].css'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
