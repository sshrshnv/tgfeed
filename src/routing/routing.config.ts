import type { Routes } from './routing.types'

export const ROUTES = {
  feedPage: (feedId: string) => ({
    pageId: 'feed',
    pageParams: { feedId }
  }),
  channelPage: (channelId: string) => ({
    pageId: 'channel',
    pageParams: { channelId }
  }),
  authPopup: {
    popupId: 'auth'
  },
  settingsPopup: {
    popupId: 'settings'
  },
  profilePopup: {
    popupId: 'profile'
  },
  menu: {
    dropdown: true
  }
} satisfies Routes
