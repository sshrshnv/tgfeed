import { userAgent } from './navigator'
import { isIOS } from './is-ios'
import { isIOSChrome } from './is-ios-chrome'

let IOSSafari
export const isIOSSafari = () =>
  IOSSafari ??= isIOS() && !isIOSChrome() && /safari|mac/i.test(userAgent)
