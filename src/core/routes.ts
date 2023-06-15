import type { Route } from '~/shared/routing'

export const routes: Record<string, Route> = {
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

  menu: {
    id: 'menu',
    type: 'dialog'
  },
  auth: {
    id: 'auth',
    type: 'dialog'
  },
  addChannel: {
    id: 'addChannel',
    type: 'dialog'
  },
  selectChannels: {
    id: 'selectChannels',
    type: 'dialog'
  },
  locale: {
    id: 'locale',
    type: 'dialog'
  },
  theme: {
    id: 'theme',
    type: 'dialog'
  },

  feedChannelSearch: {
    id: 'feedChannelSearch',
    type: 'popover'
  },
  feedOffsetSelect: {
    id: 'feedOffsetSelect',
    type: 'popover'
  }
}

export const dialogRoutes = () => Object.values(routes).filter(({ type }) => type == 'dialog')
