import type { DBStorage } from '../db-storage.types'
import { DBStorageMethods } from '../db-storage.types'

export const initDbStorage = (
  getDbStoragePromise: () => Promise<DBStorage>
): DBStorage => DBStorageMethods.reduce((obj, method) => {
  obj[method] = async (...args) => {
    const dbStorage = await getDbStoragePromise()
    // @ts-expect-error wtf
    return dbStorage[method](...args)
  }
  return obj
}, {} as DBStorage)
