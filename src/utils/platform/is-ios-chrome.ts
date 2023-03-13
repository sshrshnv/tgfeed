import { userAgent } from './navigator'
import { isIOS } from './is-ios'

let IOSChrome
export const isIOSChrome = () =>
  IOSChrome ??= isIOS() && /crios/i.test(userAgent)
