import { sendError } from '~/utils/errors'
import { isIOSSafari } from '~/utils/platform'

import { setInstallationState } from './installation-state'
import { deferredInstallationEvent } from './defer-installation'

export const promptInstallEvent = async () => {
  if (isIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    const installationEvent = await deferredInstallationEvent
    installationEvent.prompt()
    const { outcome } = await installationEvent.userChoice
    setInstallationState('completed', outcome === 'accepted')
  } catch(error: any) {
    sendError(error)
  }
}
