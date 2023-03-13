import { isChrome } from './is-chrome'
import { isSafari } from './is-safari'
import { isMicrosoftEdge } from './is-microsoft-edge'
import { isYandex } from './is-yandex'
import { isSamsung } from './is-samsung'
import { isChromium } from './is-chromium'
import { isFirefox } from './is-firefox'

let browser
export const detectBrowser = () => {
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
