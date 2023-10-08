import { DB_FILE_STORE_NAME, getDB } from './db'

export const dbFileStorage = {
  setBytes: async (key: string, bytes: ArrayBuffer) => {
    try {
      const db = await getDB()
      db.put(DB_FILE_STORE_NAME, bytes, generateFileKey(key))
    } catch {}
  },

  getBytes: async (keys: string[]) => {
    keys = keys.map(generateFileKey)
    try {
      const db = await getDB()
      return Promise.all(keys.map(key => db.get(DB_FILE_STORE_NAME, key)))
    } catch {
      return []
    }
  },

  clear: async () => {
    try {
      const db = await getDB()
      return db.clear(DB_FILE_STORE_NAME)
    } catch {}
  }
}

export const clearDbFileStorage = () => dbFileStorage.clear()

const generateFileKey = (key: string) => `file-${key}`
