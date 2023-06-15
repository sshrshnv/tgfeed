export const formatOffset = (lang: string, value: number, unit: 'hour' | 'day') =>
  new Intl.NumberFormat(lang, { style: 'unit', unit, unitDisplay: 'narrow' }).format(value)
