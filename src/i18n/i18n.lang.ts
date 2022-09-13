export type Lang = 'en' | 'ru'
export type Langs = Lang[]
export type LangName = Record<'name', string>
export type LangNames = Record<string, LangName>

export const FALLBACK_LANG = 'en'
export const LANG_NAMES = process.env.APP_LANG_NAMES as unknown as LangNames
export const LANGS = Object.keys(LANG_NAMES) as Langs
export const EXACT_LANGS = [...new Set(LANGS.filter(lang => lang.length > 2).map(lang => lang.slice(0, 2)))]

export const getDefaultLang = () => {
  let lang = self.navigator.language.slice(0, 2)

  if (EXACT_LANGS.includes(lang)) {
    lang = self.navigator.language.replace('-', '')
  }

  return (LANGS as string[]).includes(lang) ? lang : FALLBACK_LANG
}
