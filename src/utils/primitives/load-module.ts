import { createPromise } from '~/tools/utils'

const cachedModules = new WeakMap()

export const loadModule = async <T>(
  importModule: () => Promise<T>,
  cb?: (module: T) => void
): Promise<T> => {
  if (cachedModules.has(importModule)) {
    return cachedModules.get(importModule)
  }

  const [promise, resolve] = createPromise<T>()
  cachedModules.set(importModule, promise)

  const module = await importModule()
  cb && await cb(module)
  resolve(module)
  cachedModules.set(importModule, module)

  return module
}
