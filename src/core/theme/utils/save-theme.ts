import { localStorage } from '~/shared/utils/local-storage'

import type { Theme } from '../theme.types'

export const saveTheme = (theme: Theme) =>
  localStorage.set('theme', theme)
