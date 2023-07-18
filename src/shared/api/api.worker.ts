import { comlink, createPromise, setDelay } from '~/shared/utils'
import type { DBStorage } from '~/shared/storage/db-storage'
import { initDbStorage } from '~/shared/storage/db-storage/utils/init-db-storage'

import type { API, APIWorkerMessage } from './api.types'
import type { ClientMetaData, Updates } from './mtproto'
import { Client } from './mtproto'
import { handleApiRes } from './utils/handle-api-res'

const [dbStorageWorkerPromise, resolveDbStorageWorkerPromise] = createPromise<DBStorage>()
const getDbStoragePromise = () => dbStorageWorkerPromise
const dbStorage = initDbStorage(getDbStoragePromise)

const getMeta = async () => (await dbStorage.get('apiMeta', 'data')) || {
  pfs: false,
  baseDC: 2,
  userID: '',
  dcs: {}
}

const saveMeta = (meta: ClientMetaData) => {
  dbStorage.put('apiMeta', meta, 'data')
}

const deleteMeta = () => {
  dbStorage.delete('apiMeta', 'data')
}

const apiPromise = new Promise<API>(async resolve => {
  let migratedDC: number

  const meta: ClientMetaData = await getMeta()

  const client = new Client({
    APIID: +(process.env.API_ID || ''),
    APIHash: process.env.API_HASH || '',
    APILayer: 158,
    test: false,
    debug: true,
    dc: meta.baseDC,
    ssl: true,
    autoConnect: true,
    deviceModel: self.navigator.userAgent,
    appVersion: process.env.APP_VERSION,
    langCode: self.navigator.language,
    meta
  })

  client.on('metaChanged', saveMeta)

  const api: API = {
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
    }
  }

  resolve(api)
})

const apiWorker: API = {
  req: async (method, ...args) => {
    const api = await apiPromise
    const res = await api.req(method, ...args)
    return handleApiRes(method, res, dbStorage)
  },

  exec: async (...args) => {
    const api = await apiPromise
    return api.exec(...args)
  }
}

self.onmessage = (ev: MessageEvent<APIWorkerMessage>) => {
  if (ev.data?.dbStoragePort) {
    resolveDbStorageWorkerPromise(comlink.wrap(ev.data.dbStoragePort) as DBStorage)
  }
  if (ev.data?.mainPort) {
    comlink.expose(apiWorker, ev.data.mainPort)
  }
}
