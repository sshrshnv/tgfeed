import type { ThemeState, ThemeMode } from '../theme.types'
import { getThemeModeMQ } from './get-theme-mode-mq'

const themeModeEl = document.documentElement
const themeColorEl = document.querySelector('meta[name="theme-color"]') as Element
const themeColors = process.env.APP_THEME_COLORS as unknown as { light: string, dark: string }

export const setThemeModeAttribute = (themeMode: ThemeMode) => {
  if (themeMode !== themeModeEl.dataset.themeMode) {
    themeModeEl.setAttribute('data-theme-mode', themeMode)
  }
}

export const setThemeColorAttribute = (themeMode: ThemeMode) => {
  const themeColor = themeColors[
    themeMode === 'system' ? (getThemeModeMQ('dark').matches ? 'dark' : 'light') :
    themeMode
  ]
  if (themeColor !== themeColorEl.getAttribute('content')) {
    themeColorEl.setAttribute('content', themeColor)
  }
}

export const setThemeAttributes = (themeState: ThemeState) => {
  setThemeModeAttribute(themeState.mode)
  setThemeColorAttribute(themeState.mode)
}
