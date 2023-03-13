import { userAgentData } from './navigator'

let chromiumVersion
export const detectChromiumVersion = () =>
  chromiumVersion ??= +(userAgentData.brands?.find(({ brand }) => brand.toLocaleLowerCase() === 'chromium')?.version || '')
