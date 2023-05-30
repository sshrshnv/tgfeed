import { createStore } from 'solid-js/store'

import type { Locale } from './locale.types'
import { getRestoredLocale } from './actions'

export const [locale, setLocale] = createStore<Locale>(
  getRestoredLocale(localeTexts => setLocale('texts', localeTexts))
)
