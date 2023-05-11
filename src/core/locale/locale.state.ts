import { createStaticStore } from '@solid-primitives/static-store'

import type { Locale } from './locale.types'
import { getRestoredLocale } from './actions'

export const [locale, setLocale] = createStaticStore<Locale>(
  getRestoredLocale(localeTexts => setLocale('texts', localeTexts))
)
