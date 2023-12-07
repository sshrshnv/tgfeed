import type { MessageMedia, InputFileLocation } from '~/shared/api/mtproto'

import type { FeedState, FeedStorage, FontSize } from './feed.types'

export const FEED_CONFIG_MESSAGE_TAG = '#tgfeedconfig'

export const FEED_STATE_STORAGE_KEY: keyof FeedStorage['state'] = 'feedState'

export const DEFAULT_FOLDER_ID = 0

export const DEFAULT_FEED_STATE: FeedState = {
  initialLoading: true,
  streamsHandlerActivated: false,
  currentFolderId: DEFAULT_FOLDER_ID,
  defaultFolderVisibility: true,
  postUuids: [],
  newPostUuids: [],
  markedAsReadPosts: {},
  channelIds: [],
  folders: [],
  filters: [],
  postGroups: {},
  configId: 0,
  fontSize: 'medium',
  scrolling: {}
}

export const SUPPORTED_MEDIA_TYPES: Partial<MessageMedia['_'][]> = [
  'messageMediaPhoto',
  'messageMediaDocument'
]

export const SUPPORTED_MEDIA_LOCATION_TYPES: Partial<InputFileLocation['_'][]> = [
  'inputPhotoFileLocation',
  'inputDocumentFileLocation'
]

export const FONT_SIZE_LINE_HEIGHT_VALUES: Record<FontSize, number> = {
  'large': 24,
  'medium': 20,
  'small': 16
}

export const VISIBLE_LINES_COUNT = 10
