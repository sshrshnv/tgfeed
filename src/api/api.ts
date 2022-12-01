import { proxy } from 'comlink'

import { db } from '~/db'
import { loadWorkerModule, handleApiErrors } from '~/utils'

import type { ClientConfig, ClientMetaData } from './mtproto'
import type { Api } from './api.types'

const API_WORKER_PATH = './api.worker'

const API_ID = +(process.env.API_ID || '')
const API_HASH = `${process.env.API_HASH || ''}`
const API_LAYER = 143
const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'

export const api: Pick<Api, 'call'> = {
  call: async (...args) => {
    const apiWorker = await loadApiWorker()
    return apiWorker.call(...args)
  }
}

export const loadApiWorker = (): Promise<Api> => loadWorkerModule(
  API_WORKER_PATH,
  createApiWorker,
  initApiWorker
)

const createApiWorker = () => new Worker(new URL(
  './api.worker' /* webpackChunkName: 'api.worker' */,
  import.meta.url
))

const initApiWorker = async (apiWorker: Api) => {
  const meta = await getInitialMeta()

  const config: Partial<ClientConfig> = {
    APIID: API_ID,
    APIHash: API_HASH,
    APILayer: API_LAYER,
    test: IS_TEST,
    debug: IS_TEST,
    dc: meta.baseDC,
    ssl: true,
    autoConnect: true,
    deviceModel: self.navigator.userAgent,
    meta
  }

  apiWorker.init(
    config,
    proxy(handleMetaUpdate),
    proxy(() => {/**/}),
    proxy(handleApiErrors)
  )
}

const META_DB_KEY = IS_TEST ? 'metatest' : 'meta'
const INITIAL_META: ClientMetaData = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userID: ''
}
let cachedMeta: ClientMetaData

const getInitialMeta = async () => {
  cachedMeta = (await db.get<ClientMetaData>(META_DB_KEY)) || INITIAL_META
  return cachedMeta
}

const handleMetaUpdate = (updatedMeta: Partial<ClientMetaData>) => {
  cachedMeta = { ...cachedMeta, ...updatedMeta }
  db.set(META_DB_KEY, cachedMeta)
}
