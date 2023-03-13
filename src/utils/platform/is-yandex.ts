import { userAgent } from './navigator'

let Yandex
export const isYandex = () =>
  Yandex ??= /yabrowser/i.test(userAgent)
