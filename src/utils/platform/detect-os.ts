import { isIOS } from './is-ios'
import { isAndroid } from './is-android'
import { isMacOS } from './is-macos'
import { isWindows } from './is-windows'

let os
export const detectOS = () => {
  if (os) {
    return os
  } else if (isIOS()) {
    os = 'ios'
  } else if (isAndroid()) {
    os = 'android'
  } else if (isMacOS()) {
    os = 'macos'
  } else if (isWindows()) {
    os = 'windows'
  } else {
    os = 'unknown'
  }
  return os
}
