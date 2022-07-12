import { wrap, proxy } from 'comlink'

import { db } from '~/db'
import { handleApiErrors } from '~/utils'

import type { ClientConfig, ClientMetaData } from './mtproto'
import type { ApiWrapper, Api } from './api.types'

const API_ID = +(process.env.API_ID || '')
const API_HASH = `${process.env.API_HASH || ''}`
const API_LAYER = 143
const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
const META_KEY = IS_TEST ? 'metatest' : 'meta'

export let api: Api

let meta: ClientMetaData
const INITIAL_META: ClientMetaData = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userID: ''
}

export const initApi = async () => {
  if (api) return api

  const apiWrapper = wrap<ApiWrapper>(new Worker(new URL(
    /* webpackChunkName: 'api.worker' */
    './api.worker',
    import.meta.url
  )));

  [api, meta = INITIAL_META] = await Promise.all([
    apiWrapper.api,
    db.get<ClientMetaData>(META_KEY)
  ])

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

  await apiWrapper.init(
    config,
    proxy(() => {}),
    proxy(handleApiErrors)
  )

  return api
}
