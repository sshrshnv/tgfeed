import { proxy } from 'comlink'

import { loadWorker } from '~/tools/utils'
import { handleApiErrors } from '~/tools/errors'
import { writeDb, readDb } from '~/shared/db'

import type { ClientConfig, ClientMetaData as ClientMeta } from '../mtproto'
import type { ApiWorker } from './api.types'

export const API_ID = +(process.env.API_ID || '')
export const API_HASH = `${process.env.API_HASH || ''}`
export const API_LAYER = 143
export const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'

export const loadApiWorker = () => loadWorker(
  createApiWorker,
  initApiWorker
)

const createApiWorker = () => new Worker(new URL(
  './api.worker' /* webpackChunkName: 'api.worker' */,
  import.meta.url
))

const initApiWorker = async (apiWorker: ApiWorker) => {
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
const INITIAL_META: ClientMeta = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userID: ''
}
let cachedMeta: ClientMeta

const getInitialMeta = async () => {
  cachedMeta = (await readDb<ClientMeta>(META_DB_KEY)) || INITIAL_META
  return cachedMeta
}

const handleMetaUpdate = (updatedMeta: Partial<ClientMeta>) => {
  cachedMeta = { ...cachedMeta, ...updatedMeta }
  writeDb(META_DB_KEY, cachedMeta)
}
