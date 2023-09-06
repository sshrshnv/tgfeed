import type { Route } from '~/shared/routing/routing.types'

export const authRoutes = {
  page: {
    id: 'auth',
    path: '/me',
    type: 'page'
  }
} as const satisfies Record<string, Route>
