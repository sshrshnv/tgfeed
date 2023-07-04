import { localStorage } from '~/shared/utils'

import type { Locale } from '../locale.types'

export const saveLocale = (locale: Locale) =>
  localStorage.set('locale', locale)
