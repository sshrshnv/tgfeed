import type { Component } from 'solid-js'
import { Show, createMemo, createSignal, untrack } from 'solid-js'

import type { Route } from '../routing.types'
import { useRoutingState } from '../routing.hooks'

export type RouteContainerProps = {
  route: Route
  component: Component<{
    active: boolean
  }>
}

export const RouteContainer: Component<RouteContainerProps> = (props) => {
  const routingState = useRoutingState()

  const isMatch = createMemo(() => (
    (props.route.pageId === routingState.pageId) ||
    (props.route.dropdown && routingState.dropdown) ||
    (!!props.route.popupId && routingState.popupIds.includes(props.route.popupId))
  ))

  const [isActive, setActive] = createSignal(untrack(isMatch))

  return (
    <Show when={isMatch()}>
      <props.component
        active={isActive()}
      />
    </Show>
  )
}
