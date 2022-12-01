import type { Lang } from './lang.types'
import { LANGS, FALLBACK_LANG, EXACT_LANGS } from './lang.config'

export const getDefaultLang = () => {
  let lang = self.navigator.language.slice(0, 2)

  if (EXACT_LANGS.includes(lang)) {
    lang = self.navigator.language.replace('-', '')
  }

  return (
    LANGS.includes(lang as Lang) ? lang :
    FALLBACK_LANG
  ) as Lang
}

export const templateText = (
  text = '',
  textValues?: Record<string, string>
) => {
  if (!textValues) return text
  const reg = /{{(.*?)}}/g
  return text.replace(reg, (_, key) =>
    deepReadTextValues(textValues, key, '')
  )
}

const deepReadTextValues = <T = any>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: unknown
): T => {
  const value = path
    .trim()
    .split('.')
    .reduce<any>((a, b) => (a ? a[b] : undefined), obj)
  return value !== undefined ? value : defaultValue
}
