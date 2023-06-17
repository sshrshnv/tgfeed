import { render } from 'solid-js/web'

import { View, initWorkers } from '~/core'
import { restoreAccount } from '~/core/account'

import {
  preventContextMenu,
  preventDragAndDrop,
  preventScale
} from '~/shared/ui/utils'

initWorkers()
restoreAccount()

preventContextMenu()
preventDragAndDrop()
preventScale()

render(
  () => <View/>,
  self.document.body
)
