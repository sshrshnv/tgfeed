import { comlink } from '~/shared/utils/comlink'

import type { UI } from './ui.types'
import { getBluredImageBytes } from './utils/get-blured-image-bytes'
import { getThumbUrlFromBytes } from './utils/get-thumb-url-from-bytes'
import { getMediaUrlFromFile } from './utils/get-media-url-from-file'

const uiWorker: UI = {
  getBluredImageBytes,
  getThumbUrlFromBytes,
  getMediaUrlFromFile
}

comlink.expose(uiWorker)
