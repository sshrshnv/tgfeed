export const templateLocaleText = (
  text = '',
  values: Record<string, string>
) => {
  const re = /{{(.*?)}}/g
  return text.replace(re, (_match, p) => values[p.trim()])
}
