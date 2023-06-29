import type { LocaleLang } from '../locale.types'

export const formatLocaleLang = (lang: LocaleLang) =>
  new Intl.DisplayNames([lang], { type: 'language' }).of(lang)
