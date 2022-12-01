import type { Remote } from 'comlink'
import { wrap } from 'comlink'

import { asyncTimeout } from '~/utils'

const WAITING_TIMEOUT = 10000

const cachedModules = {}
const cachedWorkerModules = {}

export const loadModule = async <T>(
  modulePath: string,
  importModule: () => Promise<T>,
  cb?: () => void
): Promise<T> => {
  if (cachedModules[modulePath]) {
    return cachedModules[modulePath]
  }

  cachedModules[modulePath] = new self.Promise(async (resolve) => {
    const module = await importModule()
    resolve(module)
    cachedModules[modulePath] = module
  }).then(cb)

  return cachedModules[modulePath]
}

export type LoadModuleParams<T> = Parameters<typeof loadModule<T>>

type ExtendedWorker<T> = T & {
  check: () => true
}

export const loadWorkerModule = <T>(
  workerModulePath: string,
  createWorker: () => Worker,
  cb?: (worker: Remote<T>) => void
) => {
  if (cachedWorkerModules[workerModulePath]) {
    return cachedWorkerModules[workerModulePath]
  }

  cachedWorkerModules[workerModulePath] = new Promise<Remote<T>>(async (resolve) => {
    const wrappedWorker = wrap<ExtendedWorker<T>>(createWorker())
    await wrappedWorker.check()
    resolve(wrappedWorker)
    cachedWorkerModules[workerModulePath] = wrappedWorker
  }).then(cb)

  return cachedWorkerModules[workerModulePath]
}

export const checkWorker = (workerModulePath: string) => {
  self.setTimeout(async () => {
    await Promise.race([
      cachedWorkerModules[workerModulePath].check(),
      asyncTimeout(WAITING_TIMEOUT)
    ]).catch((err) => {
      //ERROR

    })
  })

}
