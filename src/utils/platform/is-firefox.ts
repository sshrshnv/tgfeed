import { userAgent } from './navigator'

let Firefox
export const isFirefox = () =>
  Firefox ??= /firefox/i.test(userAgent)
