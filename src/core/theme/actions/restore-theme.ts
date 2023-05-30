import { localStorage } from '~/shared/utils/local-storage'

import type { Theme } from '../theme.types'
import { getThemeModeMQ } from '../utils/get-theme-mode-mq'
import { setThemeAttributes, setThemeColorAttribute } from '../utils/set-theme-attributes'

const defaultTheme: Theme = {
  mode: 'system'
}

export const restoreTheme = () => {
  setThemeAttributes(
    getRestoredTheme()
  )

  getThemeModeMQ('dark').addEventListener('change', (ev) => {
    if (self.document.documentElement.dataset.themeMode !== 'system') return
    setThemeColorAttribute(ev.matches ? 'dark' : 'light')
  })
}

export const getRestoredTheme = () =>
  localStorage.get<Theme>('theme') || defaultTheme
