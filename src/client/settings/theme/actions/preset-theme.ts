import { localStorage } from '~/utils/local-storage'

import type { Theme } from '../theme.types'
import { themeMediaQuery } from '../utils/theme-media-query'
import { setThemeAttributes, setThemeColorAttribute } from '../utils/set-theme-attributes'

export const presetTheme = () => {
  const restoredTheme = localStorage.get<Theme>('theme') || ''
  setThemeAttributes(restoredTheme)

  themeMediaQuery.dark.addEventListener('change', (ev) => {
    if (self.document.documentElement.dataset.theme) return
    setThemeColorAttribute(ev.matches ? 'dark' : 'light')
  })
}
