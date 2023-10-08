import type { DBSchema } from 'idb'
import { openDB } from 'idb'

const DB_NAME = 'tgfeed'
const DB_VERSION = 1

export const DB_DATA_STORE_NAME = 'data'
export const DB_FILE_STORE_NAME = 'files'

type DB = {
  [DB_DATA_STORE_NAME]: DBSchema[string]
  [DB_FILE_STORE_NAME]: {
    key: string
    value: ArrayBuffer
  }
}

export const getDB = () => openDB<DB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(DB_DATA_STORE_NAME)
    db.createObjectStore(DB_FILE_STORE_NAME)
  }
})
