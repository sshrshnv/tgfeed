import { comlink, createPromise, setDelay } from '~/utils'
import type { DB, DBSchema, DBWorker } from '~/workers/db'

import type { API, APIWorker, APIWorkerMessage } from '../api.types'
import type { ClientConfig, ClientMetaData, MethodDeclMap, Updates } from './mtproto'
import { Client } from './mtproto'

const [dbWorkerProxyPromise, resolveDbWorkerProxyPromise] = createPromise<DBWorker>()

const dbWorker: DBWorker = {
  call: async cb => {
    const dbWorkerProxy = await dbWorkerProxyPromise
    return dbWorkerProxy.call(comlink.proxy(cb))
  }
}

const apiPromise = new Promise<API>(async resolve => {
  const meta = await dbWorker.call(db => db.get('state', 'meta'))
  console.log('================> META', meta)
  /*const client = new Client({

  })*/
})

const apiWorker: APIWorker = {
  call: async cb => {
    const api = await apiPromise
    return cb(comlink.proxy(api))
  }
}

self.onmessage = (ev: MessageEvent<APIWorkerMessage>) => {
  if (ev.data?.dbPort) {
    resolveDbWorkerProxyPromise(comlink.wrap(ev.data.dbPort) as DBWorker)
  }
  if (ev.data?.mainPort) {
    comlink.expose(apiWorker, ev.data.mainPort)
  }
}

/*
let client: Client
let migratedDC: number
let dbWorkerProxy:
let handleError: ApiErrorHandler

const init: ApiMethods['init'] = async (
  dbWorkerPort: MessagePort
) => {
  client = new Client({

  })
  handleError = errorHandler

  client.on('metaChanged', (meta => {
    //
  }))
}

const call: ApiMethods['call'] = async (
  method,
  data = {},
  params = {}
) => {
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

    handleError?.({ ...err, method })
    const { code, message = '' } = err

    if (code === 420) {
      const [_, delay] = message.split('FLOOD_WAIT_')
      resolve(call(method, data, { dc, thread, timeout: +delay * 1000 }))
      return
    }

    if (code === 303) {
      const [_type, dcId] = message.split('_MIGRATE_')

      dc = +dcId
      client.cfg.dc = dc
      client.dc.setBaseDC(dc)
      migratedDC = dc

      resolve(call(method, data, { dc, thread }))
      handleMetaUpdate({ baseDC: dc })
      return
    }

    if (code >= 500) {
      resolve(call(method, data, { dc, thread, timeout: attempt * 100, attempt: ++attempt }))
      return
    }

    reject(err)
  })

  return promise
}

const getPasswordKdf: Client['getPasswordKdfAsync'] =
  (...args) => client.getPasswordKdfAsync(...args)
*/
