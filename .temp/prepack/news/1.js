import { h, render } from 'preact'
import App from '/Users/apple/Documents/workspace/preact-study/src/pages/news/1/app.jsx'

let root
function bootstrap() {
  root = render(<App />, document.body, root)
}

bootstrap()
