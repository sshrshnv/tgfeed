import type { Route } from '../routing.types'

export const findRouteIndex = (history: Route[], route: Route) =>
  history.findLastIndex(item => item.type === route.type && self.JSON.stringify(item) === self.JSON.stringify(route))
