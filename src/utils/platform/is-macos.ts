import { platform, userAgent } from './navigator'

let Mac
export const isMacOS = () =>
  Mac ??= /mac/i.test(platform) || /mac/i.test(userAgent)
