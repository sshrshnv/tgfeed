import { userAgent, userAgentData } from './navigator'

let Chromium
export const isChromium = () =>
  Chromium ??= userAgentData.brands ?
    userAgentData.brands.some(({ brand }) => brand.toLocaleLowerCase() === 'chromium') :
    !!(window as any).chrome && /chrome/i.test(userAgent)
