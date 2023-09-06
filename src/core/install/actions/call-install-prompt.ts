//import { trackError } from '~/shared/tracking/errors'
import { isIOSSafari } from '~/shared/utils/detect-platform'

import { setInstallState } from '../install-state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

self.addEventListener('appinstalled', () => setInstallState('completed', true))

export const callInstallPrompt = async () => {
  if (isIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    const installPromptEvent = await getCapturedInstallPrompt()
    installPromptEvent.prompt()
    const { outcome } = await installPromptEvent.userChoice
    setInstallState('completed', outcome === 'accepted')
  } catch(error: any) {
    //trackError(error)
  }
}
