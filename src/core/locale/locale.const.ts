import type { LocaleLang, LocaleState, LocaleStorage } from './locale.types'
import { detectPreferLocaleLang } from './utils/detect-prefer-locale-lang'

export const LOCALE_LANGS = process.env.APP_LOCALE_LANGS as unknown as [LocaleLang]
export const FALLBACK_LOCALE_LANG = 'en'

export const LOCALE_STATE_STORAGE_KEY: keyof LocaleStorage['state'] = 'localeState'

export const DEFAULT_LOCALE_STATE: LocaleState = {
  lang: detectPreferLocaleLang(LOCALE_LANGS, FALLBACK_LOCALE_LANG),
  texts: null
}
