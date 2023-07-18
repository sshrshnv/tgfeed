import { localStorage } from '~/shared/storage/local-storage'

import type { ThemeState } from '../theme.types'
import { THEME_STATE_STORAGE_KEY, DEFAULT_THEME_STATE } from '../theme-state'
import { getThemeModeMQ, setThemeAttributes, setThemeColorAttribute } from '../utils'

export const presetTheme = () => {
  const persistedThemeState = localStorage.getItem<ThemeState>(THEME_STATE_STORAGE_KEY) || DEFAULT_THEME_STATE
  setThemeAttributes(persistedThemeState)
  getThemeModeMQ('dark').addEventListener('change', (ev) => {
    if (self.document.documentElement.dataset.themeMode !== 'system') return
    setThemeColorAttribute(ev.matches ? 'dark' : 'light')
  })
}
