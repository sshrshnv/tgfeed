import { render } from 'solid-js/web'

import { preventContextMenu } from '~/shared/ui/utils/prevent-context-menu'
import { preventDragAndDrop } from '~/shared/ui/utils/prevent-drag-and-drop'
import { preventScale } from '~/shared/ui/utils/prevent-scale'
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
