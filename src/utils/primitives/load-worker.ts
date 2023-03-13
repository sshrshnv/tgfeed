import type { Remote } from 'comlink'
import { wrap } from 'comlink'

import { createPromise } from '~/tools/utils'

export type LoadWorkerParams<T> = Parameters<typeof loadWorker<T>>

type ExtendedWorker<T> = T & {
  check: () => true
}

const cachedWorkers = new WeakMap()

export const loadWorker = async <T>(
  createWorker: () => Worker,
  cb?: (worker: Remote<T>) => void
): Promise<Remote<T>> => {
  if (cachedWorkers.has(createWorker)) {
    return cachedWorkers.get(createWorker)
  }

  const [promise, resolve] = createPromise<Remote<T>>()
  cachedWorkers.set(createWorker, promise)

  const wrappedWorker = wrap<ExtendedWorker<T>>(createWorker())
  cb && await cb(wrappedWorker)
  resolve(wrappedWorker)
  cachedWorkers.set(createWorker, wrappedWorker)

  return wrappedWorker
}

/*
export const checkWorker = (workerModulePath: string) => {
  self.setTimeout(async () => {
    await Promise.race([
      cachedWorkers[workerModulePath].check(),
      setDelay(WAITING_TIMEOUT)
    ]).catch((_err) => {
      //ERROR

    })
  })

}
*/
