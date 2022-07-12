export const setTimeout = (value: number) =>
  new Promise(resolve => self.setTimeout(resolve, value))

const cachedModules = {}
export const cacheModule = async <T>(
  path: string,
  importFactory: () => Promise<any>
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
