import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements'

import * as layoutCSS from '../layout.sss'
import * as logoCSS from './logo.sss'

export type LogoProps = {
  class?: string
  withTitle?: boolean
}

export const Logo: Component<LogoProps> = (props) => {
  return (
    <div class={clsx(
      props.class,
      props.withTitle && logoCSS._withTitle,
      logoCSS.base,
      layoutCSS.flex,
      layoutCSS.flexCenter
    )}>
      <Icon
        class={logoCSS.icon}
        name={props.withTitle ? 'logoText' : 'logo'}
        size='large'
      />
    </div>
  )
}
