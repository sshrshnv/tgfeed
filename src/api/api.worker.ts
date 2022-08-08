import { expose, proxy, transfer } from 'comlink'

import { setTimeout } from '~/utils'

import type { MethodDeclMap, Updates } from './mtproto'
import { Client } from './mtproto'
import type { Api, ApiErrorHandler } from './api.types'

let client: Client
let migratedDC: number
let handleUpdate//: ApiUpdateHandler
let handleError: ApiErrorHandler

const api: Api = {
  getCountry: async () => {
    const dc = await call('help.getNearestDc')
    return dc?.country || ''
  }
}

const init = async (
  config,
  updateHandler,
  errorHandler
) => {
  client = new Client(config)
  handleUpdate = updateHandler
  handleError = errorHandler
/*
  client.on('metaChanged', (newMeta ) => {
    meta = newMeta
  })

  client.updates.on(async (updates: Updates) => {
    const handledUpdates = await handleUpdates(updates)
    callback(handledUpdates)
  })*/
}

const call = async <T extends keyof MethodDeclMap>(
  method: T,
  data: MethodDeclMap[T]['req'] = {},
  params: {
    dc?: number
    thread?: number
    timeout?: number
    attempt?: number
  } = {}
): Promise<MethodDeclMap[T]['res']> => {
  const { thread, timeout } = params
  let { dc, attempt = 0 } = params
  dc = dc || migratedDC

  if (timeout) {
    await setTimeout(timeout)
  }

  return new Promise((resolve, reject) => client.call(method, data, { dc, thread }, async (err, res) => {
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

      /*const meta = await dataCache.getMeta(META_KEY, initialMeta)
      dataCache.setMeta(META_KEY, {
        ...meta,
        baseDC: dc
      })*/

      return
    }

    if (code >= 500) {
      resolve(call(method, data, { dc, thread, timeout: attempt * 100, attempt: ++attempt }))
      return
    }

    reject(err)
  }))
}

expose({
  api: proxy(api),
  init
})
