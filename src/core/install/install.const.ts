import { isStandalone } from '~/shared/utils/detect-platform'

import type { InstallState } from './install.types'

export const DEFAULT_INSTALL_STATE: InstallState = {
  available: false,
  completed: isStandalone()
}
