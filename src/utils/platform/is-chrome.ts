import { isMicrosoftEdge } from './is-microsoft-edge'
import { isYandex } from './is-yandex'
import { isSamsung } from './is-samsung'
import { isChromium } from './is-chromium'

let Chrome
export const isChrome = () =>
  Chrome ??= !isMicrosoftEdge() && !isYandex() && !isSamsung() && isChromium()
