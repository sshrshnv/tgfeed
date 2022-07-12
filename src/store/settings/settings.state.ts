import type { Lang } from '~/i18n'
import { getDefaultLang } from '~/i18n'
import type { Theme } from '~/ui/styles'
import { DEFAULT_THEME } from '~/ui/styles'

export type Settings = {
  lang: Lang
  theme: Theme
}

export const INITIAL_SETTINGS: Settings = {
  lang: getDefaultLang(),
  theme: DEFAULT_THEME
}
