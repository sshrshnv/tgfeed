import { isIOSSafari } from '~/shared/utils'

import { setInstallState } from '../install-state'
import { capturedInstallPromptEvent } from './capture-install-prompt'

export const awaitInstallAvailability = async () => {
  if (isIOSSafari()) {
    setInstallState('available', true)
    return
  }

  await capturedInstallPromptEvent
  setInstallState('available', true)
}
