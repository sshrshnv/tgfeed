/* Fixed splitChunks for worker threads */
import { wrap, expose, proxy, transfer } from 'comlink'

export const comlink = {
  wrap,
  expose,
  proxy,
  transfer
}
