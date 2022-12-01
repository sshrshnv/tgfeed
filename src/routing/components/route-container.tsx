import type { Component } from 'solid-js'
import { Show, createMemo } from 'solid-js'

import { createTransition } from '~/utils'

import type { Route } from '../routing.state'
import { useRoutingState } from '../routing.hooks'

type Props = {
  route: Route
  component: Component
}

export const RouteContainer: Component<Props> = (props) => {
  const { routingState } = useRoutingState()
  const { onStart, onEnd, isPending } = createTransition()

  const isMatch = createMemo(() => {
    return routingState.routeIds.pane.includes(props.route.id)
  })

  return (
    <Show when={isMatch() || isPending()}>
      <props.component/>
    </Show>
  )
}
