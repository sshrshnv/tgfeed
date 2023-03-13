import { platform, userAgent, userAgentData } from './navigator'

let Windows
export const isWindows = () =>
  Windows ??= (
    userAgentData.platform?.toLocaleLowerCase() === 'windows' ||
    /win/i.test(platform) || /windows/i.test(userAgent)
  )
