import { createStore } from 'solid-js/store'

import { isStandalone } from '~/shared/utils'

export const [install, setInstall] = createStore({
  available: false,
  completed: isStandalone()
})
