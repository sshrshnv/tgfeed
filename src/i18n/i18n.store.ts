import { createStore } from 'solid-js/store'

import type { Texts } from './i18n.texts'
import { INITIAL_TEXTS, templateText } from './i18n.texts'

type I18nStore = {
  texts: Texts
  t: typeof templateText
}

const INITIAL_STATE = {
  texts: INITIAL_TEXTS,
  t: templateText
} as I18nStore

export const [store, setStore] = createStore(INITIAL_STATE)
