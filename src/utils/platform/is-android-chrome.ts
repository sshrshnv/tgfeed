import { isAndroid } from './is-android'
import { isChrome } from './is-chrome'

let AndroidChrome
export const isAndroidChrome = () =>
  AndroidChrome ??= isAndroid() && isChrome()
