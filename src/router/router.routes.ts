export type Routes = typeof routes

export type Route = Partial<{
  pageId: string
  pageParams: Record<string, string>
  pagePath: string
  popupPageId: string
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
    popupPageId: 'auth'
  },
  user: {
    popupPageId: 'user'
  },
  settings: {
    popupPageId: 'settings'
  },
}
