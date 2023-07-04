import { render } from 'solid-js/web'

import { preventContextMenu, preventDragAndDrop, preventScale } from '~/shared/ui/utils'
preventContextMenu()
preventDragAndDrop()
preventScale()

import { initWorkers } from './app.workers'
initWorkers()

import { View } from './app.view'
render(
  () => <View/>,
  self.document.body
)
