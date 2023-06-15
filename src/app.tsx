import { render } from 'solid-js/web'

import { View, initWorkers } from '~/core'

import {
  preventContextMenu,
  preventDragAndDrop,
  preventScale
} from '~/shared/ui/utils'

initWorkers()

preventContextMenu()
preventDragAndDrop()
preventScale()

render(
  () => <View/>,
  self.document.body
)
