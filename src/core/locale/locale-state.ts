import { createStateStore } from '~/shared/utils'

import { DEFAULT_LOCALE_STATE, LOCALE_STATE_STORAGE_KEY } from './locale.const'
import { setLocaleAttributes, loadLocaleTexts } from './utils'

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
