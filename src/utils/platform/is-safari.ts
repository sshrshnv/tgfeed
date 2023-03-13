import { userAgent } from './navigator'
import { isChromium } from './is-chromium'

let Safari
export const isSafari = () =>
  Safari ??= !isChromium() && /safari|mac/i.test(userAgent)
