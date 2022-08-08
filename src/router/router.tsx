import type { FlowComponent } from 'solid-js'
import { createContext, useContext } from 'solid-js'

import { store } from './router.store'
import { routes } from './router.routes'
import { pushRoute, popRoute } from './router.actions'

const router = {
  router: store,
  routes,
  pushRoute,
  popRoute
}

const RouterContext = createContext(router)

export const Router: FlowComponent = (props) => {
  return (
    <RouterContext.Provider value={router}>
      {props.children}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext)
