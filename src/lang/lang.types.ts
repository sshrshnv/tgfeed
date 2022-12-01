export type Lang = 'en' | 'ru'

export type LangName = typeof import('~/lang/packs/en/lang.json')
export type LangNames = Record<Lang, LangName>

export type LangTexts = {
  auth:     typeof import('~/lang/packs/en/auth.texts.json')
  feed:     typeof import('~/lang/packs/en/feed.texts.json')
  intro:    typeof import('~/lang/packs/en/intro.texts.json')
  user:  typeof import('~/lang/packs/en/user.texts.json')
  settings: typeof import('~/lang/packs/en/settings.texts.json')
}
export type LangTextsModuleName = keyof LangTexts

export type LangData = {
  names: LangNames
  texts: LangTexts
}

export type LangState = {
  currentLang: Lang
}
