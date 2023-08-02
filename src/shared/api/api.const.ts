import type { ClientMetaData } from './mtproto'
import type { APIStorage } from './api.types'

export const API_META_STORAGE_KEY: keyof APIStorage['meta'] = 'apiMeta'

export const DEFAULT_API_META: ClientMetaData = {
  pfs: false,
  baseDC: 2,
  userID: '',
  dcs: {}
}
