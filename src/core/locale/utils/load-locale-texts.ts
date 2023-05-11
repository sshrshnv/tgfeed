import type { Locale, LocaleTexts } from '../locale.types'

export const loadLocaleTexts = (locale: Locale): Promise<LocaleTexts> =>
  import(`~/shared/locales/${locale.lang}.json` /* webpackChunkName: 'locale.' */)
