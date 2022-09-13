type NavigatorExtended = Navigator & {
  userAgentData?: {
    brands?: { brand: string, version: string }[]
    platform?: string
    mobile?: boolean
  }
}

const navigator = self.navigator as NavigatorExtended
let { platform, userAgent, maxTouchPoints } = navigator
const { userAgentData = {} } = navigator
const { brands } = userAgentData

userAgent = userAgent.toLocaleLowerCase()
platform = platform?.toLowerCase() || userAgent
maxTouchPoints = maxTouchPoints || 1

let IOS
export const isIOS = () =>
  IOS ??= (/ipad|iphone|ipod/i.test(platform) || (/mac/i.test(platform) && maxTouchPoints > 1)) && !(self as any).MSStream

let Safari
export const isSafari = () =>
  Safari ??= !isChromium() && /safari|mac/i.test(userAgent)

let IOSSafari
export const isIOSSafari = () =>
  IOSSafari ??= isIOS() && !isIOSChrome() && /safari|mac/i.test(userAgent)

let IOSChrome
export const isIOSChrome = () =>
  IOSChrome ??= isIOS() && /crios/i.test(userAgent)

let Android
export const isAndroid = () =>
  Android ??= (/android/i.test(platform) || /android/i.test(userAgent)) && !(self as any).MSStream

let MicrosoftEdge
export const isMicrosoftEdge = () =>
  MicrosoftEdge ??= brands ?
    brands.some(({ brand }) => brand.toLocaleLowerCase() === 'microsoft edge') :
    /edg/i.test(userAgent)

let Yandex
export const isYandex = () =>
  Yandex ??= /yabrowser/i.test(userAgent)

let Samsung
export const isSamsung = () =>
  Samsung ??= /samsung/i.test(userAgent)

let Chromium
export const isChromium = () =>
  Chromium ??= brands ?
    brands.some(({ brand }) => brand.toLocaleLowerCase() === 'chromium') :
    !!(window as any).chrome && /chrome/i.test(userAgent)

let Chrome
export const isChrome = () =>
  Chrome ??= !isMicrosoftEdge() && !isYandex() && !isSamsung() && isChromium()

let Firefox
export const isFirefox = () =>
  Firefox ??= /firefox/i.test(userAgent)

let AndroidChrome
export const isAndroidChrome = () =>
  AndroidChrome ??= isAndroid() && isChrome()

let Windows
export const isWindows = () =>
  Windows ??= (
    userAgentData.platform?.toLocaleLowerCase() === 'windows' ||
    /win/i.test(platform) || /windows/i.test(userAgent)
  )

let Mac
export const isMac = () =>
  Mac ??= /mac/i.test(platform) || /mac/i.test(userAgent)

let Desktop
export const isDesktop = () =>
  Desktop ??= !isIOS() && !isAndroid()

let DesktopChrome
export const isDesktopChrome = () =>
  DesktopChrome ??= isDesktop() && isChrome()

let iosVersion
export const getIOSVersion = () =>
  iosVersion ??= +(userAgent.substr(userAgent.indexOf('os ') + 3, 4).replace('_', '.') || '')

let chromiumVersion
export const getChromiumVersion = () =>
  chromiumVersion ??= +(brands?.find(({ brand }) => brand.toLocaleLowerCase() === 'chromium')?.version || '')

let os
export const getOS = () => {
  if (os) {
    return os
  } else if (isIOS()) {
    os = 'ios'
  } else if (isAndroid()) {
    os = 'android'
  } else if (isMac()) {
    os = 'mac'
  } else if (isWindows()) {
    os = 'windows'
  } else {
    os = 'unknown'
  }
  return os
}

let browser
export const getBrowser = () => {
  if (browser) {
    return browser
  } else if (isChrome()) {
    browser = 'chrome'
  } else if (isSafari()) {
    browser = 'safari'
  } else if (isMicrosoftEdge()) {
    browser = 'edge'
  } else if (isYandex()) {
    browser = 'yandex'
  } else if (isSamsung()) {
    browser = 'samsung'
  } else if (isChromium()) {
    browser = 'chromium'
  } else if (isFirefox()) {
    browser = 'firefox'
  } else {
    browser = 'unknown'
  }
  return browser
}
