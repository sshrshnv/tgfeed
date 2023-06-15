import type { Locale, LocaleTexts } from '../locale.types'

export const loadLocaleTexts = async (locale: Locale): Promise<LocaleTexts> => {
  const localeTextsModule = await import(`~/shared/ui/locales/${locale.lang}.json` /* webpackChunkName: 'locale.' */)
  return localeTextsModule.default
}
