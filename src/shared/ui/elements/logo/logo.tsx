import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements'

import * as logoCSS from './logo.sss'

type LogoProps = {
  class?: string
  animated?: boolean
}

export const Logo: Component<LogoProps> = (props) => {
  return (
    <Icon
      class={clsx(
        props.class,
        props.animated && logoCSS._animated
      )}
      name='logo'
      size='medium'
    />
  )
}
