import { comlink, createPromise, setDelay } from '~/shared/utils'
import type { DBWorker, DBWorkerCaller } from '~/shared/db'

import type { API, APIWorker, APIWorkerMessage } from './api.types'
import type { ClientConfig, MethodDeclMap, Updates } from './mtproto'
import { Client } from './mtproto'

const [dbWorkerPromise, resolveDbWorkerPromise] = createPromise<DBWorker>()

const callDbWorker: DBWorkerCaller = async cb => {
  const dbWorker = await dbWorkerPromise
  return dbWorker.call(comlink.proxy(cb))
}

const apiPromise = new Promise<API>(async resolve => {
  const meta = await callDbWorker(db => db.get('apiMeta', 'data'))
  console.log('================> META', meta)
  /*const client = new Client({

  })*/
})

let api: API
const apiWorker: APIWorker = {
  call: async cb => {
    if (!api) {
      api = await apiPromise
      api = comlink.proxy(api)
    }
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
