import { createEffect } from 'solid-js'

import { useSettings } from '~/store'

export type Langs = string[]
export type Lang = Langs[number]
export type LangName = Record<'name', string>
export type LangNames = Record<string, LangName>

export const FALLBACK_LANG= 'en'
export const LANG_NAMES: LangNames = process.env.APP_LANG_NAMES as any
export const LANGS: Langs = Object.keys(LANG_NAMES)
export const EXACT_LANGS = [...new Set(LANGS.filter(lang => lang.length > 2).map(lang => lang.slice(0, 2)))]

export const getDefaultLang = () => {
  let lang = self.navigator.language.slice(0, 2)

  if (EXACT_LANGS.includes(lang)) {
    lang = self.navigator.language.replace('-', '')
  }

  return LANGS.includes(lang) ? lang : FALLBACK_LANG
}

export const setLangAttribute = () => {
  const htmlEl = self.document.documentElement
  const { settings } = useSettings()

  createEffect(() => {
    htmlEl.setAttribute('lang', settings.lang)
  })
}
