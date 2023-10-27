import { isIOSSafari, isIOSChrome, isChrome, isMicrosoftEdge, isWindows, isSamsung } from '~/shared/utils/detect-platform'

import { setInstallState } from '../install-state'
import { getCapturedInstallPrompt } from './capture-install-prompt'

export const awaitInstallAvailability = async () => {
  if (isIOSSafari() || isIOSChrome()) {
    setInstallState('available', true)
    return
  }

  if (isChrome() || isSamsung() || (isWindows() && isMicrosoftEdge())) {
    await getCapturedInstallPrompt()
    setInstallState('available', true)
  }
}
