import { createStore } from 'solid-js/store'

import { isStandalone } from '~/shared/utils'

export const [installState, setInstallState] = createStore({
  available: false,
  completed: isStandalone()
})
