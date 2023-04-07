import { render } from 'solid-js/web'

import { Pages } from './ui'

export const renderClient = () => render(
  Pages,
  self.document.body
)
