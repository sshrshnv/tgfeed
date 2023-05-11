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

  auth: {
    id: 'auth',
    type: 'popup'
  },
  menu: {
    id: 'menu',
    type: 'popup'
  }
}
