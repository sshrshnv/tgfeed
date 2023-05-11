import { isIOSSafari } from '~/shared/utils'

import { setInstallState } from '../install.state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

export const awaitInstallAvailability = async () => {
  if (isIOSSafari()) {
    setInstallState('available', true)
    return
  }

  await getCapturedInstallPrompt()
  setInstallState('available', true)
}
