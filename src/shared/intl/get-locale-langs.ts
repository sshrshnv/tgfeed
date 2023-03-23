import type { State } from '~/core/state'

export const getLocaleLangs = () =>
  process.env.APP_LOCALE_LANGS as unknown as Record<State['localeLang'], typeof import('~/locales/en/lang.json')>
