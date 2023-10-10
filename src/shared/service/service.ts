import { comlink } from '~/shared/utils/comlink'
import { postMessage } from '~/shared/utils/post-message'

import type { Service } from './service.types'
import { getService, endUpdate } from './worker/register-service-worker'
import { reregisterServiceWorker } from './utils/reregister-service-worker'

export const service: Service = {
  check: async () => {
    if (navigator.serviceWorker.controller) {
      postMessage(navigator.serviceWorker.controller, { check: true })
    }
    const serviceWorker = await getService()
    return serviceWorker.check()
  },

  handleStreams: async (...args) => {
    const serviceWorker = await getService()
    return serviceWorker.handleStreams(
      comlink.proxy(...args)
    )
  },

  handleStreamFilePartLoad: async (...args) => {
    const serviceWorker = await getService()
    return serviceWorker.handleStreamFilePartLoad(...args)
  },

  handleUpdate: () => {
    endUpdate()
    reregisterServiceWorker()
  }
}
