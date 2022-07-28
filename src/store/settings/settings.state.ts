import type { Lang } from '~/i18n'
import { getDefaultLang } from '~/i18n'
//import type { Theme } from '~/ui/css'
//import { DEFAULT_THEME } from '~/ui/css'

export type Settings = {
  lang: Lang
  theme: string
}

export const INITIAL_SETTINGS: Settings = {
  lang: getDefaultLang(),
  theme: 'system'
}
