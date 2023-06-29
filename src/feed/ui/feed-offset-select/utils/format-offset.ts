export const formatOffset = (
  lang: string,
  value: number,
  unit: 'hour' | 'day',
  unitDisplay: 'narrow' | 'long' = 'narrow'
) => new Intl.NumberFormat(lang, { style: 'unit', unit, unitDisplay }).format(value)
