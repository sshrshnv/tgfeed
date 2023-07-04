import { localStorage } from '~/shared/utils/local-storage'

import type { Locale } from '../locale.types'
import { detectPreferLocaleLang } from './detect-prefer-locale-lang'

export const getSavedLocale = (): Locale => localStorage.get('locale') || ({
  lang: detectPreferLocaleLang()
})
