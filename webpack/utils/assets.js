const root = process.cwd()
const path = require('path')
const fs = require('fs')

const pathConfig = {
  dll: path.resolve(root, './.temp/dll')
}

const {
  output: { publicPath }
} = require('../webpack.dll.config.js')

let htmlAssets = []

if (fs.existsSync(`${pathConfig.dll}/index.json`)) {
  htmlAssets = Object.entries(require(`${pathConfig.dll}/index.json`))
    .map(([k, v]) => {
      return Object.values(v)
    })
    .reduce((prev, cur) => {
      prev.push(
        ...cur
          .map(v => v.slice(1))
          .filter(
            v =>
              typeof v === 'string' && ['.js', '.css'].some(k => v.endsWith(k))
          )
      )
      return prev
    }, [])
}

module.exports = { htmlAssets }
