import { trackError } from '~/tracking/errors'
import { isIOSSafari } from '~/utils'

import { setInstallState } from '../install.state'
import { capturedInstallPromptEvent } from './capture-install-prompt'

self.addEventListener('appinstalled', () => setInstallState('completed', true))

export const promptInstallEvent = async () => {
  if (isIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    const nativeInstallEvent = await capturedInstallPromptEvent
    nativeInstallEvent.prompt()
    const { outcome } = await nativeInstallEvent.userChoice
    setInstallState('completed', outcome === 'accepted')
  } catch(error: any) {
    trackError(error)
  }
}
