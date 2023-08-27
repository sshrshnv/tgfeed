import { comlink } from '~/shared/utils'

import type { UIWorkerMessage } from './ui.types'
import {
  getBluredImageBytes,
  getThumbUrlFromBytes,
  getMediaUrlFromFile
} from './utils'

const uiWorker = {
  getBluredImageBytes,
  getThumbUrlFromBytes,
  getMediaUrlFromFile
}

self.onmessage = (ev: MessageEvent<UIWorkerMessage>) => {
  if (ev.data?.mainPort) {
    comlink.expose(uiWorker, ev.data.mainPort)
  }
}
