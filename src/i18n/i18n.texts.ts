export type Texts = typeof import('./en/texts.json')
export const INITIAL_TEXTS = process.env.APP_INITIAL_TEXTS as unknown as Texts

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

export const templateText = (
  text = '',
  textValues: Record<string, string> = {}
) => {
  const reg = /{{(.*?)}}/g
  return text.replace(reg, (_, key) => deepReadTextValues(textValues, key, ''))
}
