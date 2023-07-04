import { comlink, createPromise, setDelay } from '~/shared/utils'
import type { DBWorker, DBWorkerCaller } from '~/shared/db'

import type { API, APIWorker, APIWorkerMessage } from './api.types'
import type { ClientMetaData, Updates } from './mtproto'
import { Client } from './mtproto'

const [dbWorkerPromise, resolveDbWorkerPromise] = createPromise<DBWorker>()

const callDbWorker: DBWorkerCaller = async cb => {
  const dbWorker = await dbWorkerPromise
  return dbWorker.call(comlink.proxy(cb))
}

const apiPromise = new Promise<API>(async resolve => {
  let meta: ClientMetaData = await callDbWorker(db => db.get('apiMeta', 'data')) || {
    pfs: false,
    baseDC: 2,
    userID: '',
    dcs: {}
  }

  const saveMeta = (metaData: Partial<ClientMetaData>) => {
    meta = { ...meta, ...metaData }
    callDbWorker(db => db.put('apiMeta', meta, 'data'))
  }

  const client = new Client({
    APIID: +(process.env.API_ID || ''),
    APIHash: process.env.API_HASH || '',
    APILayer: 158,
    test: false,
    debug: false,
    dc: meta.baseDC,
    ssl: true,
    autoConnect: true,
    deviceModel: self.navigator.userAgent,
    appVersion: process.env.APP_VERSION,
    langCode: self.navigator.language,
    meta
  })

  client.on('metaChanged', (saveMeta))

  const api: API = {
    req: async (method, data = {}, params = {}) => {
      const { thread, timeout } = params
      let { dc = meta.baseDC, attempt = 0 } = params

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

        if (code === 420) {
          const [_, delay] = message.split('FLOOD_WAIT_')
          resolve(api.req(method, data, {
            dc, thread, timeout: +delay * 1000
          }))
          return
        }

        if (code === 303) {
          const [_type, dcId] = message.split('_MIGRATE_')

          dc = +dcId
          client.cfg.dc = dc
          client.dc.setBaseDC(dc)

          resolve(api.req(method, data, {
            dc, thread
          }))
          saveMeta({ baseDC: dc })
          return
        }

        if (code >= 500) {
          resolve(api.req(method, data, {
            dc, thread, timeout: attempt * 100, attempt: ++attempt
          }))
          return
        }

        reject(err)
      })

      return promise
    },

    localReq: async (method, data) => {
      return client[method]?.(data)
    }
  }

  resolve(api)
}).then(api => {
  return comlink.proxy(api)
})

const apiWorker: APIWorker = {
  call: async cb => {
    const api = await apiPromise
    return cb(api)
  }
}

self.onmessage = (ev: MessageEvent<APIWorkerMessage>) => {
  if (ev.data?.dbPort) {
    resolveDbWorkerPromise(comlink.wrap(ev.data.dbPort) as DBWorker)
  }
  if (ev.data?.mainPort) {
    comlink.expose(apiWorker, ev.data.mainPort)
  }
}
