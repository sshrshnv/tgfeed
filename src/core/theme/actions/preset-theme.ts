import { localStorage } from '~/shared/storage/local-storage'

import { THEME_STATE_STORAGE_KEY, DEFAULT_THEME_STATE } from '../theme.const'
import { getThemeModeMQ } from '../utils/get-theme-mode-mq'
import { setThemeAttributes, setThemeColorAttribute } from '../utils/set-theme-attributes'

export const presetTheme = () => {
  const persistedThemeState = localStorage.get(THEME_STATE_STORAGE_KEY) || DEFAULT_THEME_STATE
  setThemeAttributes(persistedThemeState)
  getThemeModeMQ('dark').addEventListener('change', (ev) => {
    if (self.document.documentElement.dataset.themeMode !== 'system') return
    setThemeColorAttribute(ev.matches ? 'dark' : 'light')
  })
}
