export type ThemeMode = 'system' | 'light' | 'dark'
export type ThemeColor = string

export type ThemeState = {
  mode: ThemeMode
}

export type ThemeStorage = {
  state: { themeState: ThemeState }
}
