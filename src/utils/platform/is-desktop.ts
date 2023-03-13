import { isIOS } from './is-ios'
import { isAndroid } from './is-android'

let Desktop
export const isDesktop = () =>
  Desktop ??= !isIOS() && !isAndroid()
