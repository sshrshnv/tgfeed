import { expose, proxy, transfer } from 'comlink'

import { createPromise, setDelay } from '~/tools/utils'

import type { ClientConfig, MethodDeclMap, Updates } from '../mtproto'
import { Client } from '../mtproto'
import type { ApiWorker, ApiMetaUpdateHandler, ApiErrorHandler } from './api.types'

let client: Client
let migratedDC: number
let handleMetaUpdate: ApiMetaUpdateHandler
let handleUpdate//: ApiUpdateHandler
let handleError: ApiErrorHandler

const init: ApiWorker['init'] = async (
  config,
  metaUpdateHandler,
  updateHandler,
  errorHandler
) => {
  client = new Client(config)
  handleMetaUpdate = metaUpdateHandler
  handleUpdate = updateHandler
  handleError = errorHandler

  client.on('metaChanged', metaUpdateHandler)

/*
  client.updates.on(async (updates: Updates) => {
    const handledUpdates = await handleUpdates(updates)
    callback(handledUpdates)
  })*/
}

const call: ApiWorker['call'] = async (
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

const api = ({
  init,
  call,
  getPasswordKdf
})

api['check'] = () => true
expose(api)
