import { createStore } from 'solid-js/store'

import type { RoutesItem } from './router.routes'
import { routes } from './router.routes'

export type RouterStore = Omit<RoutesItem, 'popupPageId'> & {
  popupPageIds: RoutesItem['popupPageId'][]
}

const INITIAL_STATE: RouterStore = {
  pageId: self.location.pathname === routes.feeds.pagePath ? routes.feeds.pageId : routes.intro.pageId,
  pageParams: Object.fromEntries((new URLSearchParams(self.location.search)).entries()),
  pagePath: `${self.location.pathname}${self.location.search}`,
  popupPageIds: []
}

export const [store, setStore] = createStore(INITIAL_STATE)
