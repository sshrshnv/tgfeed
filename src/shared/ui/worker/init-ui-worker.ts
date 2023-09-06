import { comlink } from '~/shared/utils/comlink'
import { createPromise } from '~/shared/utils/create-promise'
import { postMessage } from '~/shared/utils/post-message'

import type { UI } from './ui.types'

let uiWorkerInstance: Worker
let [uiWorkerPromise, resolveUiWorkerPromise] = createPromise<UI>()

export const initUiWorker = (
  mainUiMessageChannel: MessageChannel
) => {
  if (uiWorkerInstance) {
    try {
      uiWorkerInstance.terminate()
    } finally {
      [uiWorkerPromise, resolveUiWorkerPromise] = createPromise<UI>()
    }
  }

  uiWorkerInstance = new Worker(new URL(
    './ui-worker' /* webpackChunkName: 'ui-worker' */,
    import.meta.url
  ))

  postMessage(uiWorkerInstance, {
    mainPort: mainUiMessageChannel.port1
  }, [
    mainUiMessageChannel.port1
  ])

  resolveUiWorkerPromise(
    comlink.wrap(mainUiMessageChannel.port2) as UI
  )
}

export const getUiWorker = () => uiWorkerPromise
