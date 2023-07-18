import { createStateStore } from '~/shared/utils'

import type { LocaleState, LocaleLang } from './locale.types'
import { detectPreferLocaleLang, setLocaleAttributes, loadLocaleTexts } from './utils'

const LOCALE_LANGS = process.env.APP_LOCALE_LANGS as unknown as [LocaleLang]
const FALLBACK_LOCALE_LANG = 'en'

export const LOCALE_STATE_STORAGE_KEY = 'localeState'

export const DEFAULT_LOCALE_STATE: LocaleState = {
  lang: detectPreferLocaleLang(LOCALE_LANGS, FALLBACK_LOCALE_LANG),
  texts: null
}

export const [localeState, setLocaleState] = createStateStore({
  defaultState: DEFAULT_LOCALE_STATE,
  staticState: true,
  storageKey: LOCALE_STATE_STORAGE_KEY,
  nonPersistedKeys: ['texts'],
  onCreate: async (state, setState) => {
    const texts = await loadLocaleTexts(state)
    setState({ texts })
  },
  onChange: async (prevState, state, setState) => {
    if (prevState.lang === state.lang) return
    const texts = await loadLocaleTexts(state)
    setState({ texts })
    setLocaleAttributes(state)
  }
})
