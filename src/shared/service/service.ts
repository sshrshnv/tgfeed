import { comlink } from '~/shared/utils/comlink'

import type { Service } from './service.types'
import { getService } from './worker/register-service-worker'

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
  }
}
