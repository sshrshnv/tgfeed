import { FlowComponent } from 'solid-js'
import { createContext, useContext, createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store"

import { useSettings } from '~/store'

import type { Lang } from './lang'
import { LANGS } from './lang'
import type { Texts } from './texts'
import { INITIAL_TEXTS, templateText } from './texts'

type I18n = {
  texts: Texts
  t: typeof templateText
}

type Store = {
  [key in Lang]: Texts | undefined
}

const INITIAL_STATE: Store = LANGS.reduce((obj, lang) => ({
  ...obj,
  [lang]: undefined
}), {})

const [store, setStore] = createStore(INITIAL_STATE)
const I18nContext = createContext<I18n>({ texts: INITIAL_TEXTS, t: templateText })

let resolveI18nPromise: (value?: unknown) => void
const i18nPromise = new Promise(resolve => resolveI18nPromise = resolve)

const loadTexts = async (lang: string) => {
  if (store[lang]) return

  const { default: texts } = await import(`~/i18n/texts/${lang}/texts.json`)
  setStore(lang, texts)
  resolveI18nPromise()
}

export const I18nProvider: FlowComponent = (props) => {
  const { settings } = useSettings()

  const getI18n = createMemo(() => ({
    texts: store[settings.lang] || INITIAL_TEXTS,
    t: templateText
  }))

  createEffect(() => {
    if (!settings.lang) return
    loadTexts(settings.lang)
  })

  return (
    <I18nContext.Provider value={getI18n()}>
      {props.children}
    </I18nContext.Provider>
  )
}

export const waitI18n = () => i18nPromise

export const useI18n = () => useContext(I18nContext)
