import { createStore } from 'solid-js/store'

import type { Locale, LocaleTexts } from './locale.types'
import { getSavedLocale, loadLocaleTexts } from './utils'

const getInitialState = (cb: (localeTexts: LocaleTexts) => void) => {
  const savedLocale = getSavedLocale()
  loadLocaleTexts(savedLocale).then(cb)
  return savedLocale
}

export const [locale, setLocale] = createStore<Locale>(
  getInitialState(localeTexts => setLocale('texts', localeTexts))
)
