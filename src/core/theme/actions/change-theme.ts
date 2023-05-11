import { localStorage } from '~/shared/utils'

import type { Theme } from '../theme.types'
import { setTheme } from '../theme.state'
import { setThemeAttributes } from '../utils'

export const changeTheme = (theme: Theme) => {
  setTheme('mode', theme.mode)
  setThemeAttributes(theme)
  localStorage.set('theme', theme)
}
