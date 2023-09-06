import { createStore } from 'solid-js/store'

import { isStandalone } from '~/shared/utils/detect-platform'

export const [installState, setInstallState] = createStore({
  available: false,
  completed: isStandalone()
})
