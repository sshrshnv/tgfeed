import { FALLBACK_LOCALE_LANG } from '~/core/locale/locale.const'

export const formatPostsDate = (value: number, { lang = FALLBACK_LOCALE_LANG }) => {
  const date = new Date(value * 1000).toDateString()
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  return date === today.toDateString() ?
    new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(0, 'day') :
    date === yesterday.toDateString() ?
      new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(-1, 'day') :
      new Intl.DateTimeFormat(self.navigator.languages as string[]).format(value * 1000)
}
