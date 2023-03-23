import type { State } from '~/core/state'

import { getLocaleLangs } from './get-locale-langs'

export const detectLocaleLang = () => {
  const localeLangs = getLocaleLangs()
  return (self.navigator.languages.find(lang => !!localeLangs[lang]) || 'en') as State['localeLang']
}
