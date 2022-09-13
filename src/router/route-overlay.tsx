import type { Component } from 'solid-js'
import { splitProps } from 'solid-js'

import type { OverlayProps } from '~/ui/elements'
import { Overlay } from '~/ui/elements'

import type { RouteState } from './router.routes'
import { popRoute } from './router.actions'

type Props = {
  route: RouteState
} & OverlayProps

export const RouteOverlay: Component<Props> = (_props) => {
  const [props, overlayProps] = splitProps(_props, ['route'])

  const handleClick = () => {
    popRoute(props.route)
  }

  return (
    <Overlay
      {...overlayProps}
      onClick={handleClick}
    />
  )
}
