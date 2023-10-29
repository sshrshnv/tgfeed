import type { ClientMetaData, DocumentAttribute } from './mtproto'
import type { APIStorage } from './api.types'

export const API_META_STORAGE_KEY: keyof APIStorage['meta'] = 'apiMeta'

export const DEFAULT_API_META: ClientMetaData = {
  pfs: false,
  baseDC: 2,
  userID: '',
  dcs: {}
}

export const API_LOADING_PART_SIZE = 1024 * 1024
export const API_LOADING_TIMEOUT = 200
export const API_MAX_LOADING_THREAD_COUNT = 2
export const API_MAX_LOADING_COUNT = 2

export const SUPPORTED_MEDIA_DOCUMENT_TYPES: Partial<DocumentAttribute['_'][]> = [
  'documentAttributeImageSize',
  'documentAttributeVideo',
  'documentAttributeAudio'
]
