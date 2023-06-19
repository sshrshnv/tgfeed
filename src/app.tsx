import { render } from 'solid-js/web'

import { initWorkers } from '~/core/workers'
import { View } from '~/core/view'
import { restoreAccount } from '~/core/account/actions'

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
