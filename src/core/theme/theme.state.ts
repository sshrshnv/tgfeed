import { createStore } from 'solid-js/store'

import type { Theme } from './theme.types'
import { getRestoredTheme } from './actions'

export const [theme, setTheme] = createStore<Theme>(
  getRestoredTheme()
)
