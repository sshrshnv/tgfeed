import type { Component } from 'solid-js'
import { splitProps } from 'solid-js'

import type { ButtonProps } from '~/ui/components'
import { Button } from '~/ui/components'

import type { Route } from '../routing.types'
import { pushRoute, popRoute } from '../routing.actions'

type Props = {
  route: Route
  back?: boolean
} & ButtonProps

export const RouteButton: Component<Props> = (_props) => {
  const [props, buttonProps] = splitProps(_props, ['route', 'back'])

  const handleClick = () => {
    props.back ? popRoute(props.route) : pushRoute(props.route)
  }

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
    />
  )
}
