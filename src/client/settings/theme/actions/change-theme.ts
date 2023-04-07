import { localStorage } from '~/utils'

import type { Theme } from '../theme.types'
import { setTheme } from '../theme.state'
import { setThemeAttributes } from '../utils'

export const changeTheme = (theme: Theme) => {
  setTheme(theme)
  setThemeAttributes(theme)
  localStorage.set('theme', theme)
}
