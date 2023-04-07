import { createSignal } from 'solid-js'

import type { Theme } from './theme.types'

export const [getTheme, setTheme] = createSignal<Theme>(
  (self.document.documentElement.dataset.theme || '') as Theme
)
