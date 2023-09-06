import type { Route } from '~/shared/routing/routing.types'

export const coreRoutes = {
  menuDialog: {
    id: 'menu',
    type: 'dialog'
  }
} as const satisfies Record<string, Route>
