import { render } from 'solid-js/web'

import { createWorkers } from '~/shared/workers'
createWorkers()

const App = () => {
  return (
    <div/>
  )
}

render(
  App,
  self.document.body
)
