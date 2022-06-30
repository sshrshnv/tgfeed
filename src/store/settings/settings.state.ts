import type { Lang } from '~/i18n'
import type { Theme } from '~/ui/styles'
import { DEFAULT_THEME } from '~/ui/styles'

import { restoreSettings } from './settings.actions'

export type Settings = {
  lang: Lang
  theme: Theme
}

export const INITIAL_SETTINGS: Settings = {
  lang: '',
  theme: DEFAULT_THEME
}

restoreSettings()
