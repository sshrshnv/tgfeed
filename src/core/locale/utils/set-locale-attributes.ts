import type { Locale, LocaleLang } from '../locale.types'

const localeLangEl = self.document.documentElement

export const setLocaleLangAttribute = (localeLang: LocaleLang) => {
  if (localeLang !== localeLangEl.lang) {
    localeLangEl.setAttribute('lang', localeLang)
  }
}

export const setLocaleAttributes = (locale: Locale) => {
  setLocaleLangAttribute(locale.lang)
}
