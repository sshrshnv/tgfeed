import { logOut } from '~/core/account/actions/log-out'

import type { API } from './api.types'
import { getApiWorker } from './worker/init-api-worker'

export const api: API = {
  req: async (...args) => {
    const apiWorker = await getApiWorker()
    return apiWorker
      .req(...args)
      .catch(err => {
        if (err.message === 'CONNECTION_NOT_INITED') {
          self.location.reload()
          return
        }
        if (err.message === 'AUTH_KEY_UNREGISTERED') {
          logOut()
          return
        }
        console.error(err)
        throw(err)
      })
  },

  exec: async (...args) => {
    const apiWorker = await getApiWorker()
    return apiWorker.exec(...args)
  }
}
