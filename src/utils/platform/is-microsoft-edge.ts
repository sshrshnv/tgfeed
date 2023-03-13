import { userAgent, userAgentData } from './navigator'

let MicrosoftEdge
export const isMicrosoftEdge = () =>
  MicrosoftEdge ??= userAgentData.brands ?
    userAgentData.brands.some(({ brand }) => brand.toLocaleLowerCase() === 'microsoft edge') :
    /edg/i.test(userAgent)
