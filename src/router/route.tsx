import type { Component, Setter, Accessor } from 'solid-js'
import { createContext, createSignal, createMemo, useContext } from 'solid-js'
import { Show } from 'solid-js/web'

import type { RoutesItem } from './router.routes'
import { useRouter } from './router'

type Props = {
  component: Component
} & (
  | {
    pageRoute: RoutesItem
    popupPageRoute?: never
  }
  | {
    pageRoute?: never
    popupPageRoute: RoutesItem
  }
)

const INITIAL_STATE = {
  route: {} as RoutesItem,
  isMatch: (() => true) as Accessor<boolean>,
  setTransition: ((value) => value) as Setter<boolean>
}

const RouteContext = createContext(INITIAL_STATE)

export const Route: Component<Props> = (props) => {
  /* eslint-disable solid/reactivity */
  const { pageRoute, popupPageRoute } = props
  const route = pageRoute || popupPageRoute

  const { router } = useRouter()
  const [isTransition, setTransition] = createSignal(false)

  const isMatch = pageRoute ?
    createMemo(() => router.pageId === pageRoute.pageId) :
    createMemo(() => router.popupPageIds.includes(popupPageRoute.popupPageId))

  const getRoute = createMemo(() => ({
    route,
    isMatch,
    setTransition
  }))

  return (
    <Show when={isMatch() || isTransition()}>
      <RouteContext.Provider value={getRoute()}>
        <props.component/>
      </RouteContext.Provider>
    </Show>
  )
}

export const useRoute = () => useContext(RouteContext)
