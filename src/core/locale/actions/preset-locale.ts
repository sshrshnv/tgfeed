import { localStorage } from '~/shared/storage/local-storage'

import { LOCALE_STATE_STORAGE_KEY, DEFAULT_LOCALE_STATE } from '../locale.const'
import { setLocaleAttributes, loadLocaleTexts } from '../utils'

export const presetLocale = async () => {
  const persistedLocaleState = localStorage.get(LOCALE_STATE_STORAGE_KEY) || DEFAULT_LOCALE_STATE
  setLocaleAttributes(persistedLocaleState)
  loadLocaleTexts(persistedLocaleState)
}
