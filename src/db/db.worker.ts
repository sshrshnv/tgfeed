import { expose } from 'comlink'
import { createStore, get, set, clear } from 'idb-keyval'

import type { Db } from './db.types'

type Store = ReturnType<typeof createStore>

type StoreParams = {
  safe?: boolean,
  tmp?: boolean
}

const stores = {
  general: { type: 'general', name: 'tgfeed-db', store: undefined as Store | undefined },
  safe: { type: 'safe', name: 'tgfeed-safe-db', store: undefined as Store | undefined },
  tmp: { type: 'tmp', name: 'tgfeed-tmp-db', store: undefined as Store | undefined }
}

const getStore = (params?: StoreParams) => {
  const storeType =
    params?.safe ? stores.safe.type :
    params?.tmp ? stores.tmp.type :
    stores.general.type

  if (!stores[storeType].store) {
    stores[storeType].store = createStore(stores[storeType].name, 'data')
  }

  return stores[storeType].store as Store
}

const db: Db = {
  set: (key, data, params) => {
    return set(key, data, getStore(params))
  },

  get: (key, params) => {
    return get(key, getStore(params))
  },

  clear: (params) => {
    return clear(getStore(params))
  }
}

expose(db)
