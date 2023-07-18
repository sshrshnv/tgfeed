import type { LocaleState, LocaleTexts } from '../locale.types'

export const loadLocaleTexts = async (localeState: LocaleState): Promise<LocaleTexts> => {
  const localeTextsModule = await import(`~/shared/ui/locales/${localeState.lang}.json` /* webpackChunkName: 'locale.' */)
  return localeTextsModule.default
}
