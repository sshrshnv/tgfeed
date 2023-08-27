import { MessageMedia, DocumentAttribute, InputFileLocation } from '~/shared/api/mtproto'

import type { FeedState, FeedStorage } from './feed.types'

export const FEED_CONFIG_MESSAGE_TAG = '#tgfeedconfig'

export const FEED_STATE_STORAGE_KEY: keyof FeedStorage['state'] = 'feedState'

export const DEFAULT_FOLDER_ID = 0

export const DEFAULT_FEED_STATE: FeedState = {
  initialLoading: true,
  currentFolderId: DEFAULT_FOLDER_ID,
  defaultFolderVisibility: true,
  postUuids: [],
  folders: [],
  filters: [],
  channels: {},
  posts: {},
  postGroups: {},
  configId: 0
}

export const SUPPORTED_MEDIA_TYPES: Partial<MessageMedia['_'][]> = [
  'messageMediaPhoto',
  'messageMediaDocument'
]

export const SUPPORTED_MEDIA_LOCATION_TYPES: Partial<InputFileLocation['_'][]> = [
  'inputPhotoFileLocation',
  'inputDocumentFileLocation'
]

export const SUPPORTED_MEDIA_DOCUMENT_TYPES: Partial<DocumentAttribute['_'][]> = [
  'documentAttributeImageSize',
  'documentAttributeVideo',
  'documentAttributeAudio'
]
