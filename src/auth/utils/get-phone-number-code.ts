import type { HelpCountriesList } from '~/shared/api/mtproto'

export const getPhoneNumberCode = (
  countriesList: HelpCountriesList | undefined,
  country: string
) => {
  const countries = countriesList?._ === 'help.countriesList' ? countriesList.countries : []
  return countries.find(({ iso2 }) => iso2 === country)?.country_codes?.[0].country_code || ''
}
