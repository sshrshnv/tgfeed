import { localStorage } from '~/shared/storage/local-storage'

import type { LocaleState } from '../locale.types'
import { LOCALE_STATE_STORAGE_KEY, DEFAULT_LOCALE_STATE } from '../locale-state'
import { setLocaleAttributes, loadLocaleTexts } from '../utils'

export const presetLocale = async () => {
  const persistedLocaleState = localStorage.getItem<LocaleState>(LOCALE_STATE_STORAGE_KEY) || DEFAULT_LOCALE_STATE
  setLocaleAttributes(persistedLocaleState)
  loadLocaleTexts(persistedLocaleState)
}
