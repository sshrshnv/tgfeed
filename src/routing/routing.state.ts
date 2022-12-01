import { createStore } from 'solid-js/store'

import { ROUTES } from './routing.config'

type Routes = typeof ROUTES
type RouteKey = keyof Routes
type RouteId = Routes[RouteKey]['id']
type RouteType = Routes[RouteKey]['type']

export type Route = {
  id: RouteId
  type: RouteType
  path?: string
}

export type RoutingState = {
  currentActiveRoute: Route
  activeRouteIds: {
    [key in RouteType]: RouteId[]
  }
}

const INITIAL_ROUTING_STATE: RoutingState = {
  currentActiveRoute: ROUTES.root,
  activeRouteIds: {
    page: [ROUTES.root.id],
    pane: [],
  }
}

export const [routingState, setRoutingState] = createStore<RoutingState>(INITIAL_ROUTING_STATE)
