import { localStorage } from '~/shared/utils/local-storage'

import type { Theme } from '../theme.types'

export const getSavedTheme = (): Theme => localStorage.get('theme') || ({
  mode: 'system'
})
