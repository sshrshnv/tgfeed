import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'

import type { UI } from './ui.types'

let uiWorkerInstance: Worker
let [uiWorkerPromise, resolveUiWorkerPromise] = createPromise<UI>()

export const initUiWorker = () => {
  if (uiWorkerInstance) {
    try {
      uiWorkerInstance.terminate?.()
    } finally {
      [uiWorkerPromise, resolveUiWorkerPromise] = createPromise<UI>()
    }
  }

  uiWorkerInstance = new Worker(new URL(
    './ui-worker' /* webpackChunkName: 'ui-worker' */,
    import.meta.url
  ))

  resolveUiWorkerPromise(
    comlink.wrap(uiWorkerInstance) as UI
  )
}

export const getUiWorker = () => uiWorkerPromise
