import { createStore } from 'solid-js/store'

import { isStandalone } from '~/utils/platform'

export const [installationState, setInstallationState] = createStore({
  available: false,
  completed: isStandalone()
})
