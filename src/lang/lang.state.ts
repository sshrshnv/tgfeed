import { createStore } from 'solid-js/store'

import { liteDb } from '~/db'

import type { LangState } from './lang.types'
import { getDefaultLang } from './lang.utils'

const LANG_LITE_DB_KEY = 'langState'

const LANG_INITIAL_STATE: LangState = {
  currentLang: getDefaultLang()
}

export const [langState, setLangState] = createStore<LangState>({
  ...LANG_INITIAL_STATE,
  ...liteDb.getRestored()?.[LANG_LITE_DB_KEY]
})
