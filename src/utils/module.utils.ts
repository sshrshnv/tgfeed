const cachedModules = {}

export const cacheModule = async <T>(
  path: string,
  importFactory: () => Promise<T>
): Promise<T> => {
  if (cachedModules[path]) {
    return cachedModules[path]
  }

  cachedModules[path] = new Promise(async (resolve) => {
    const module = await importFactory()
    resolve(module)
    cachedModules[path] = module
  })

  return cachedModules[path]
}
