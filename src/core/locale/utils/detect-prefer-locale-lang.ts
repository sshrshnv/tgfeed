import type { LocaleLang } from '../locale.types'

export const detectPreferLocaleLang = (
  localeLangs: [LocaleLang],
  fallbackLocaleLang: LocaleLang
): LocaleLang => {
  const langs = self.navigator.languages as [LocaleLang]
  return langs.find(lang => localeLangs.includes(lang)) || fallbackLocaleLang
}
