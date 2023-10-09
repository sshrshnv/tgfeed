import { comlink } from '~/shared/utils/comlink'

import type { Service } from './service.types'
import { getService, endUpdate } from './worker/register-service-worker'
import { reregisterServiceWorker } from './utils/reregister-service-worker'

export const service: Service = {
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
