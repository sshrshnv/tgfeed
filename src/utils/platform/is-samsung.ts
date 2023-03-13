import { userAgent } from './navigator'

let Samsung
export const isSamsung = () =>
  Samsung ??= /samsung/i.test(userAgent)
