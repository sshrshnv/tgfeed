import { comlink } from '~/shared/utils'

import type { UIWorkerMessage } from './ui.types'
import { getBluredImageData, getImageUrlFromBytes } from './utils'

const uiWorker = {
  getBluredImageData,
  getImageUrlFromBytes
}

self.onmessage = (ev: MessageEvent<UIWorkerMessage>) => {
  if (ev.data?.mainPort) {
    comlink.expose(uiWorker, ev.data.mainPort)
  }
}
