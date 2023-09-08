import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'

import type { API } from '../api.types'

let apiWorkerInstance: Worker
let [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<API>()

export const initApiWorker = () => {
  if (apiWorkerInstance) {
    try {
      apiWorkerInstance.terminate?.()
    } finally {
      [apiWorkerPromise, resolveApiWorkerPromise] = createPromise<API>()
    }
  }

  apiWorkerInstance = new Worker(new URL(
    './api-worker' /* webpackChunkName: 'api-worker' */,
    import.meta.url
  ))

  resolveApiWorkerPromise(
    comlink.wrap(apiWorkerInstance) as API
  )
}

export const getApiWorker = () => apiWorkerPromise
