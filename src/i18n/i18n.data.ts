import { createStore } from 'solid-js/store'

import type { LangData } from './i18n.types'

const LANG_INITIAL_DATA: LangData = {
  names: process.env.APP_LANG_NAMES,
  texts: process.env.APP_INITIAL_TEXTS
} as unknown as LangData

export const [langData, setLangData] = createStore<LangData>(
  LANG_INITIAL_DATA
)
