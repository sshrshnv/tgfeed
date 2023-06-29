import type { Route } from '~/shared/routing'

export const feedRoutes = {
  page: {
    id: 'feed',
    path: '/me',
    type: 'page'
  },

  channelsPage: {
    id: 'feedChannels',
    type: 'page'
  },
  filtersPage: {
    id: 'feedFilters',
    type: 'page'
  },

  channelSearchPopover: {
    id: 'feedChannelSearch',
    type: 'popover'
  },
  filterSearchPopover: {
    id: 'feedFilterSearch',
    type: 'popover'
  },
  offsetSelectPopover: {
    id: 'feedOffsetSelect',
    type: 'popover'
  }
} as const satisfies Record<string, Route>
