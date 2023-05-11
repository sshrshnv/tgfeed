import type { ThemeMode } from '../theme.types'

const themeModeMQ: {
  [key in Exclude<ThemeMode, 'system'>]?: MediaQueryList
} = {}

export const getThemeModeMQ = (themeMode: keyof typeof themeModeMQ) =>
  themeModeMQ[themeMode] ??= self.matchMedia(`(prefers-color-scheme: ${themeMode})`)
