export type LocaleLang = 'en'
export type LocaleTexts = typeof import('~/shared/ui/locales/en.json')

export type LocaleState = {
  lang: LocaleLang
  texts: LocaleTexts | null
}

export type LocaleStorage = {
  state: { localeState: LocaleState }
}
