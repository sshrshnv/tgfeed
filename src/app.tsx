import { render } from 'solid-js/web'

import { preventContextMenu } from '~/shared/ui/utils/prevent-context-menu'
import { preventDragAndDrop } from '~/shared/ui/utils/prevent-drag-and-drop'
import { preventScale } from '~/shared/ui/utils/prevent-scale'
preventContextMenu()
preventDragAndDrop()
preventScale()

import { initApiWorker } from '~/shared/api/worker/init-api-worker'
import { initUiWorker } from '~/shared/ui/worker/init-ui-worker'
import { registerServiceWorker } from '~/shared/service/worker/register-service-worker'
import { clearDbFileStorage } from '~/shared/storage/db-file-storage'
initApiWorker()
initUiWorker()
registerServiceWorker()
clearDbFileStorage()

import { awaitInstallAvailability } from '~/core/install/actions/await-install-availability'
awaitInstallAvailability()

import { View } from './app.view'
render(
  () => <View/>,
  self.document.body
)

self.onfocus = () => {
  console.log(0, 'WINDOW FOCUS')
}
