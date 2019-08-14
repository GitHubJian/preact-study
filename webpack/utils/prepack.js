const root = process.cwd()
const path = require('path')
const glob = require('glob')
const nunjucks = require('nunjucks')

const fse = require('fs-extra')

const pathConfig = {
  pages: path.resolve(root, './src/pages'),
  prepack: path.resolve(root, './.temp/prepack')
}

const createRelativePath = (from, to) => path.relative(from, to)

glob
  .sync(pathConfig.pages + '/**/app.jsx')
  .map(v =>
    v.substring(pathConfig.pages.length + 1, v.length - 'app.jsx'.length - 1)
  )
  .forEach(key => {
    let content = nunjucks.renderString(
      `import { h, render } from 'react';
import App from '{{ path }}';
    
export default render(<App />, document.getElementById('csr'));
`,
      {
        path: path.resolve(pathConfig.pages, `${key}/app.jsx`)
      }
    )

    fse.outputFileSync(`${pathConfig.prepack}/${key}.js`, content, 'utf-8')
  })
