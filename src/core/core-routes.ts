import type { Route } from '~/shared/routing'

export const coreRoutes = {
  menuDialog: {
    id: 'menu',
    type: 'dialog'
  }
} as const satisfies Record<string, Route>
