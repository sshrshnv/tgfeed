import { setDelay } from '~/utils/primitives'
import { isIOSSafari } from '~/utils/platform'

import { setInstallationState } from './installation-state'
import { deferredInstallationEvent } from './defer-installation'

export const awaitInstallation = async () => {
  self.addEventListener('appinstalled', () => setInstallationState('completed', true))

  if (isIOSSafari()) {
    await setDelay(1000)
    setInstallationState('available', true)
    return
  }

  await deferredInstallationEvent
  setInstallationState('available', true)
}
