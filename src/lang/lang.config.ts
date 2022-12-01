import type { Lang, LangNames } from './lang.types'

export const LANG_NAMES = process.env.APP_LANG_NAMES as unknown as LangNames

export const LANGS = Object.keys(LANG_NAMES) as unknown as Lang[]
export const FALLBACK_LANG: Lang = 'en'
export const EXACT_LANGS = [...new Set(LANGS
  .filter(lang => lang.length > 2)
  .map(lang => lang.slice(0, 2))
)]
