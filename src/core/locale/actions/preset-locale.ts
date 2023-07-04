import { getSavedLocale, setLocaleAttributes, loadLocaleTexts } from '../utils'

export const presetLocale = async () => {
  const savedLocale = getSavedLocale()
  setLocaleAttributes(savedLocale)
  loadLocaleTexts(savedLocale)
}
