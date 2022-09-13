import type { Component, Setter, Accessor } from 'solid-js'
import { createContext, createSignal, createMemo, useContext } from 'solid-js'
import { Show } from 'solid-js/web'

import type { RouteState } from './router.routes'
import { useRouter } from './router'

type Props = {
  component: Component
} & (
  | {
    pageRoute: RouteState
    paneRoute?: never
  }
  | {
    pageRoute?: never
    paneRoute: RouteState
  }
)

const INITIAL_STATE = {
  route: {} as RouteState,
  isMatch: (() => true) as Accessor<boolean>,
  hasOverlay: (() => false) as Accessor<boolean>,
  setTransition: ((value) => value) as Setter<boolean>
}

const RouteContext = createContext(INITIAL_STATE)

export const Route: Component<Props> = (props) => {
  /* eslint-disable solid/reactivity */
  const { pageRoute, paneRoute } = props
  const route = pageRoute || paneRoute

  const { router } = useRouter()
  const [isTransition, setTransition] = createSignal(false)

  const isMatch = pageRoute ?
    createMemo(() => router.pageId === pageRoute.pageId) :
    createMemo(() => router.paneIds.includes(paneRoute.paneId))

  const hasOverlay = pageRoute ?
    () => false :
    createMemo(() => router.paneIds[0] === paneRoute.paneId)

  const getRoute = createMemo(() => ({
    route,
    isMatch,
    hasOverlay,
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
