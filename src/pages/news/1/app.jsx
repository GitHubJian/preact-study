import { h, Component } from 'preact'
import { Section } from '@components'

export default class App extends Component {
  render() {
    return (
      <div class="layout">
        <div class="main">
          <Section />
        </div>
      </div>
    )
  }
}
