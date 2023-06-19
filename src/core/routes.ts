export const routes = {
  intro: {
    id: 'intro',
    path: '/',
    type: 'page',
  },
  feed: {
    id: 'feed',
    path: '/me',
    type: 'page'
  },
  feedChannels: {
    id: 'feedChannels',
    type: 'page'
  },
  feedFilters: {
    id: 'feedFilters',
    type: 'page'
  },

  feedChannelSearch: {
    id: 'feedChannelSearch',
    type: 'popover'
  },
  feedFilterSearch: {
    id: 'feedFilterSearch',
    type: 'popover'
  },
  feedOffsetSelect: {
    id: 'feedOffsetSelect',
    type: 'popover'
  },
  feedChannelsSelect: {
    id: 'feedChannelsSelect',
    type: 'popover'
  },
  feedFiltersSelect: {
    id: 'feedFiltersSelect',
    type: 'popover'
  },

  menu: {
    id: 'menu',
    type: 'dialog'
  },
  auth: {
    id: 'auth',
    type: 'dialog'
  },
} as const
