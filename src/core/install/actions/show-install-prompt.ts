import { isIOSSafari } from '~/shared/utils/detect-platform'

import { setInstallState } from '../install-state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

self.addEventListener('appinstalled', () => setInstallState('completed', true))

export const showInstallPrompt = async () => {
  if (isIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    const installPromptEvent = await getCapturedInstallPrompt()
    installPromptEvent.prompt()
    const { outcome } = await installPromptEvent.userChoice
    if (outcome === 'accepted') {
      setInstallState('completed', true)
    }
    else {
      setInstallState('available', false)
    }
  } catch(error: any) {
    setInstallState('available', false)
  }
}
