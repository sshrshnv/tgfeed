import { localStorage } from '~/shared/utils'

import type { Locale } from '../locale.types'
import { setLocale } from '../locale.state'
import { loadLocaleTexts, setLocaleAttributes } from '../utils'

export const changeLocale = (locale: Locale) => {
  setLocale('lang', locale.lang)
  setLocaleAttributes(locale)
  loadLocaleTexts(locale).then(localeTexts => {
    setLocale('texts', localeTexts)
  })
  localStorage.set('locale', locale)
}
