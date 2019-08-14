const root = process.cwd()
const path = require('path')
const glob = require('glob')

const pathConfig = {
  prepack: path.resolve(root, './.temp/prepack'),
  global: path.resolve(root, './src/global')
}

const entry = glob.sync(pathConfig.prepack + '/**/*.js').reduce((prev, cur) => {
  let extname = path.extname(cur)
  let entryKey = cur.substring(
    pathConfig.prepack.length + 1,
    cur.length - extname.length
  )

  prev[entryKey] = cur

  return prev
}, {})

module.exports = entry
