import type { Theme } from '../theme.types'
import { setTheme } from '../theme.state'
import { saveTheme, setThemeAttributes } from '../utils'

export const changeTheme = (theme: Theme) => {
  setTheme('mode', theme.mode)
  setThemeAttributes(theme)
  saveTheme(theme)
}
