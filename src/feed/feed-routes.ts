import type { Route } from '~/shared/routing'

export const feedRoutes = {
  page: {
    id: 'feed',
    path: '/me',
    type: 'page'
  },

  searchPage: {
    id: 'feedSearch',
    type: 'page'
  },

  channelsMenuDialog: {
    id: 'feedChannelsMenu',
    type: 'dialog'
  },

  channelsFolderForm: {
    id: 'feedChannelsFolderForm',
    type: 'state'
  }
} as const satisfies Record<string, Route>
