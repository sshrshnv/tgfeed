import { userAgent } from './navigator'

let iosVersion
export const detectIOSVersion = () =>
  iosVersion ??= +(userAgent.substr(userAgent.indexOf('os ') + 3, 4).replace('_', '.') || '')
