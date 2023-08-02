import type { ThemeState, ThemeStorage } from './theme.types'

export const THEME_STATE_STORAGE_KEY: keyof ThemeStorage['state'] = 'themeState'

export const DEFAULT_THEME_STATE: ThemeState = {
  mode: 'system'
}
