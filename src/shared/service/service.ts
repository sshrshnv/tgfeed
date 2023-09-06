import type { Service } from './service.types'

import { getService } from './worker/register-service-worker'

export const service: Service = {
  getStreamUrl: async (...args) => {
    const serviceWorker = await getService()
    return serviceWorker.getStreamUrl(...args)
  }
}
