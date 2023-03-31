import { createStore } from 'solid-js/store'

import { isStandalone } from '~/utils'

export const [installState, setInstallState] = createStore({
  available: false,
  completed: isStandalone()
})
