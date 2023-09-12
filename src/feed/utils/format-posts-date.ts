import { FALLBACK_LOCALE_LANG } from '~/core/locale/locale.const'

export const formatPostsDate = (value: number, { lang = FALLBACK_LOCALE_LANG }) => {
  const date = new Date(value * 1000)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return date.toDateString() === yesterday.toDateString() ?
    new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(-1, 'day') :
    new Intl.DateTimeFormat(self.navigator.languages as string[]).format(value * 1000)
}
