import { createStaticStore } from '@solid-primitives/static-store'

import type { Theme } from './theme.types'
import { getRestoredTheme } from './actions'

export const [theme, setTheme] = createStaticStore<Theme>(
  getRestoredTheme()
)
