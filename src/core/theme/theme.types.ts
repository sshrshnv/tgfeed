export type ThemeMode = 'system' | 'light' | 'dark'
export type ThemeColor = string

export type Theme = {
  mode: ThemeMode
  color?: ThemeColor
}
