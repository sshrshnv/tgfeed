import { initWorkers, renderView } from '~/core'
initWorkers()
renderView()

import { preventContextMenu, preventDragAndDrop, preventScale } from '~/shared/utils'
preventContextMenu()
preventDragAndDrop()
preventScale()
