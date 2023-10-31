import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'
import { setDelay } from '~/shared/utils/set-delay'
import { dbStorage } from '~/shared/storage/db-storage'

import type { API } from '../api.types'
import type { ClientMetaData } from '../mtproto'
import { Client } from '../mtproto'
import { DEFAULT_API_META, API_META_STORAGE_KEY } from '../api.const'
import { handleApiResponse } from './utils/handle-api-response'
import { handleApiUpdates } from './utils/handle-api-updates'

let updateCallback: Parameters<API['listenUpdates']>[0]

const getMeta = async () =>
  (await dbStorage.get(API_META_STORAGE_KEY)) || DEFAULT_API_META

const saveMeta = (meta: ClientMetaData) =>
  dbStorage.set(API_META_STORAGE_KEY, meta)

const deleteMeta = () =>
  dbStorage.del(API_META_STORAGE_KEY)

const apiPromise = new Promise<Omit<API, 'check'>>(async resolve => {
  let migratedDC: number

  const meta: ClientMetaData = await getMeta()

  const client = new Client({
    APIID: +(process.env.API_ID || ''),
    APIHash: process.env.API_HASH || '',
    APILayer: 158,
    test: false,
    debug: process.env.DEPLOY_ENV !== 'production',
    dc: meta.baseDC,
    ssl: true,
    autoConnect: true,
    deviceModel: self.navigator.userAgent,
    appVersion: process.env.APP_VERSION,
    langCode: self.navigator.language,
    meta
  })

  client.on('metaChanged', saveMeta)

  const api: Omit<API, 'check'> = {
    req: async (method, data = {}, params = {}) => {
      const { thread, timeout } = params
      let { dc, attempt = 0 } = params
      dc = dc || migratedDC

      if (timeout) {
        await setDelay(timeout)
      }

      const [promise, resolve, reject] = createPromise()

      client.call(method, data, { dc, thread }, async (err, res) => {
        if (!err) {
          resolve(res)
          return
        }

        const { code, message = '' } = err

        if (code === 303) {
          const [_type, dcId] = message.split('_MIGRATE_')

          dc = +dcId
          client.cfg.dc = dc
          client.dc.setBaseDC(dc)

          resolve(api.req(method, data, {
            dc, thread
          }))

          migratedDC = dc
          const meta = await getMeta()
          saveMeta({ ...meta, baseDC: dc })
          return
        }

        if (code === 420) {
          const [, delay] = message.split('FLOOD_WAIT_')
          resolve(api.req(method, data, {
            dc, thread, timeout: +delay * 1000
          }))
          return
        }

        if (code >= 500) {
          resolve(api.req(method, data, {
            dc, thread, timeout: attempt * 100, attempt: ++attempt
          }))
          return
        }

        if (message === 'CONNECTION_NOT_INITED') {
          await deleteMeta()
        }

        reject(new Error(message, {
          cause: method
        }))
      })

      return promise
    },

    exec: async (method, data) => {
      return client[method]?.(data)
    },

    listenUpdates: async () => {
      client.updates.on(updates => {
        const res = handleApiUpdates(updates)
        if (!res) return
        updateCallback?.(res)
      })
    }
  }

  resolve(api)
})

const apiWorker: API = {
  check: async () => true,

  req: async (method, ...args) => {
    const api = await apiPromise
    const res = await api.req(method, ...args)
    return handleApiResponse(method, res, args[0])
  },

  exec: async (...args) => {
    const api = await apiPromise
    return api.exec(...args)
  },

  listenUpdates: async (cb) => {
    updateCallback = cb
    const api = await apiPromise
    api.listenUpdates()
  }
}

comlink.expose(apiWorker)
