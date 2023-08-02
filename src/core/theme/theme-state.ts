import { localStorage } from '~/shared/storage/local-storage'
import { createStateStore } from '~/shared/utils'

import { setThemeAttributes } from './utils'

import { DEFAULT_THEME_STATE, THEME_STATE_STORAGE_KEY } from './theme.const'

export const [themeState, setThemeState] = createStateStore({
  defaultState: DEFAULT_THEME_STATE,
  staticState: true,
  storageKey: THEME_STATE_STORAGE_KEY,
  onChange: (_prevState, state) => setThemeAttributes(state)
})

export const getPersistedThemeState = () =>
  localStorage.get(THEME_STATE_STORAGE_KEY) || DEFAULT_THEME_STATE
