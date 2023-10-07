import { createStateStore } from '~/shared/utils/create-state-store'

import { DEFAULT_INSTALL_STATE } from './install.const'

export const [installState, setInstallState] = createStateStore({
  defaultState: DEFAULT_INSTALL_STATE,
  staticState: true
})
