import type { Route } from '~/shared/routing'

export const introRoutes = {
  page: {
    id: 'intro',
    path: '/',
    type: 'page',
  }
} as const satisfies Record<string, Route>
