import { maxTouchPoints, userAgent } from './navigator'

let IOS
export const isIOS = () =>
  IOS ??= (/ipad|iphone|ipod/i.test(userAgent) || (/mac/i.test(userAgent) && maxTouchPoints > 1)) && !(self as any).MSStream
