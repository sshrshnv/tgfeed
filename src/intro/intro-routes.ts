import type { Route } from '~/shared/routing/routing.types'

export const introRoutes = {
  page: {
    id: 'intro',
    path: '/',
    type: 'page',
  }
} as const satisfies Record<string, Route>
