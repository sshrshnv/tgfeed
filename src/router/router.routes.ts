export type Routes = typeof routes

export type RouteState = Partial<{
  pageId: string
  pageParams: Record<string, string>
  pagePath: string
  paneId: string
}>

export const routes = {
  intro: {
    pageId: 'intro',
    pagePath: '/'
  },
  feeds: {
    pageId: 'feeds',
    pagePath: '/app'
  },
  feed: (feedId: string) => ({
    pageId: 'feeds',
    pageParams: { feed: feedId },
    pagePath: `/app?feed=${feedId}`
  }),

  auth: {
    paneId: 'auth'
  },
  user: {
    paneId: 'user'
  },
  settings: {
    paneId: 'settings'
  },
}
