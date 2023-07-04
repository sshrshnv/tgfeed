import type { Locale } from '../locale.types'
import { setLocale } from '../locale.state'
import { saveLocale, loadLocaleTexts, setLocaleAttributes } from '../utils'

export const changeLocale = async (locale: Locale) => {
  setLocale('lang', locale.lang)
  const localeTexts = await loadLocaleTexts(locale)
  setLocale(state => ({ ...state, texts: localeTexts }))
  setLocaleAttributes(locale)
  saveLocale(locale)
}
