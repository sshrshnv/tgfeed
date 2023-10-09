import type { UI } from './ui.types'

import { getUiWorker } from './worker/init-ui-worker'

export const ui: UI = {
  check: async () => {
    const uiWorker = await getUiWorker()
    return uiWorker.check()
  },

  getThumbUrlFromBytes: async (...args) => {
    const uiWorker = await getUiWorker()
    return uiWorker.getThumbUrlFromBytes(...args)
  },

  getBluredImageBytes: async (...args) => {
    const uiWorker = await getUiWorker()
    return uiWorker.getBluredImageBytes(...args)
  },

  getMediaUrlFromFile: async (...args) => {
    const uiWorker = await getUiWorker()
    return uiWorker.getMediaUrlFromFile(...args)
  }
}
