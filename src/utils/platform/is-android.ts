import { platform, userAgent } from './navigator'

let Android
export const isAndroid = () =>
  Android ??= (/android/i.test(platform) || /android/i.test(userAgent)) && !(self as any).MSStream
