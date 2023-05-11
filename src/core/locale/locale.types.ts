export type LocaleLang = 'en'
export type LocaleTexts = typeof import('~/shared/locales/en.json')

export type Locale = {
  lang: LocaleLang
  texts?: LocaleTexts
}
