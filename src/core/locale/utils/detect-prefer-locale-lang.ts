import type { LocaleLang } from '../locale.types'

let preferLocaleLang: LocaleLang
const localeLangs = process.env.APP_LOCALE_LANGS as unknown as [LocaleLang]
const fallbackLang = 'en'

export const detectPreferLocaleLang = () => {
  if (!preferLocaleLang) {
    const langs = self.navigator.languages as [LocaleLang]
    preferLocaleLang = langs.find(lang => localeLangs.includes(lang)) || fallbackLang
  }
  return preferLocaleLang
}
