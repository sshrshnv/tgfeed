import { createStore } from 'solid-js/store'

import type { Theme } from './theme.types'
import { getSavedTheme } from './utils'

const getInitialState = () => {
  return getSavedTheme()
}

export const [theme, setTheme] = createStore<Theme>(
  getInitialState()
)
