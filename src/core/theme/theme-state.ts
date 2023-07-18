import { localStorage } from '~/shared/storage/local-storage'
import { createStateStore } from '~/shared/utils'

import type { ThemeState } from './theme.types'
import { setThemeAttributes } from './utils'

export const THEME_STATE_STORAGE_KEY = 'themeState'

export const DEFAULT_THEME_STATE: ThemeState = {
  mode: 'system'
}

export const [themeState, setThemeState] = createStateStore({
  defaultState: DEFAULT_THEME_STATE,
  staticState: true,
  storageKey: THEME_STATE_STORAGE_KEY,
  onChange: (_prevState, state) => setThemeAttributes(state)
})

export const getPersistedThemeState = () =>
  localStorage.getItem<ThemeState>(THEME_STATE_STORAGE_KEY) || DEFAULT_THEME_STATE
