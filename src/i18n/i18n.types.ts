export type Lang = {
  code: 'en' | 'ru'
  params: typeof import('~/i18n/lang-packs/en/lang.json')
  data: {
    
  }
}

export type Lang = 'en' | 'ru'
export type LangParams = typeof import('~/i18n/lang-packs/en/lang.json')
//export type LangPackNames = Record<LangPack, LangName>

export type LangData = {
  auth:     typeof import('~/i18n/lang-packs/en/auth.texts.json')
  feed:     typeof import('~/i18n/lang-packs/en/feed.texts.json')
  intro:    typeof import('~/i18n/lang-packs/en/intro.texts.json')
  user:     typeof import('~/i18n/lang-packs/en/user.texts.json')
  settings: typeof import('~/i18n/lang-packs/en/settings.texts.json')
}
export type LangPackTextsModuleName = keyof LangTexts

export type I18nData = {
  names: LangNames
  texts: LangTexts
}

export type LangState = {
  currentLang: Lang
}
