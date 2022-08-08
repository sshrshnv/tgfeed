import { createStore } from 'solid-js/store'

import type { Texts } from './texts'
import type { Lang } from './lang'
import { LANGS } from './lang'

type I18nStore = {
  [key in Lang]: Texts | undefined
}

const INITIAL_STATE: I18nStore = LANGS.reduce((obj, lang) => ({
  ...obj,
  [lang]: undefined
}), {})

export const [store, setStore] = createStore(INITIAL_STATE)
