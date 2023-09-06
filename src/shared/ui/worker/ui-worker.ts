import { comlink } from '~/shared/utils/comlink'

import type { UIWorkerMessage } from './ui.types'
import { getBluredImageBytes } from './utils/get-blured-image-bytes'
import { getThumbUrlFromBytes } from './utils/get-thumb-url-from-bytes'
import { getMediaUrlFromFile } from './utils/get-media-url-from-file'

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
