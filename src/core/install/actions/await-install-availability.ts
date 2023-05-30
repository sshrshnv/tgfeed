import { isIOSSafari } from '~/shared/utils'

import { setInstall } from '../install.state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

export const awaitInstallAvailability = async () => {
  if (isIOSSafari()) {
    setInstall('available', true)
    return
  }

  await getCapturedInstallPrompt()
  setInstall('available', true)
}
