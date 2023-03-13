import { render } from 'solid-js/web'

import { Page } from '~/page/page'

const App = () => {
  return (
    <Page/>
  )
}

render(
  App,
  self.document.body
)
