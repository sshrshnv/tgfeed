import { createPromise } from '~/shared/utils/create-promise'
import { localStorage } from '~/shared/utils/local-storage'

import type { Locale, LocaleTexts } from '../locale.types'
import { detectPreferLocaleLang } from '../utils/detect-prefer-locale-lang'
import { loadLocaleTexts } from '../utils/load-locale-texts'
import { setLocaleAttributes } from '../utils/set-locale-attributes'

let restoredLocale: Locale
const [localeTextsPromise, resolveLocaleTextsPromise] = createPromise<LocaleTexts>()

export const restoreLocale = async () => {
  restoredLocale = localStorage.get<Locale>('locale') || {
    lang: detectPreferLocaleLang()
  }
  setLocaleAttributes(restoredLocale)
  const localeTexts = await loadLocaleTexts(restoredLocale)
  resolveLocaleTextsPromise(localeTexts)
}

export const getRestoredLocale = (cb: (localeTexts: LocaleTexts) => void) => {
  if (!restoredLocale) restoreLocale()
  localeTextsPromise.then(localeTexts => cb(localeTexts))
  return restoredLocale
}
