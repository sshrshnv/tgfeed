import { isDesktop } from './is-desktop'
import { isChrome } from './is-chrome'

let DesktopChrome
export const isDesktopChrome = () =>
  DesktopChrome ??= isDesktop() && isChrome()
