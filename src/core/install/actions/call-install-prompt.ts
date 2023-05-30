//import { trackError } from '~/shared/tracking/errors'
import { isIOSSafari } from '~/shared/utils'

import { setInstall } from '../install.state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

self.addEventListener('appinstalled', () => setInstall('completed', true))

export const callInstallPrompt = async () => {
  if (isIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    const installPromptEvent = await getCapturedInstallPrompt()
    installPromptEvent.prompt()
    const { outcome } = await installPromptEvent.userChoice
    setInstall('completed', outcome === 'accepted')
  } catch(error: any) {
    //trackError(error)
  }
}
