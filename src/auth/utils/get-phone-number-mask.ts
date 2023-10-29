import type { HelpCountriesList, HelpCountryCode } from '~/shared/api/mtproto'

let countryCodesCache: HelpCountryCode.helpCountryCode[]

export const getPhoneNumberMask = (
  countriesList: HelpCountriesList | undefined,
  value: string
) => {
  value = value.replaceAll(/\D/g, '')
  if (!countryCodesCache) {
    const countries = countriesList?._ === 'help.countriesList' ? countriesList.countries : []
    countryCodesCache = countries.flatMap(({ country_codes  }) => country_codes)
  }
  const code = countryCodesCache.find(({ country_code }) =>
    value.startsWith(country_code.slice(0, Math.min(value.length, country_code.length)))
  )

  if (!code?.patterns?.length) return ''
  const pattern = code.patterns.reduce((a, b) => a.length > b.length ? a : b)

  return `${code.country_code.replaceAll(/\d/g, '9')} ${pattern.replaceAll('X', '9')}`
}
