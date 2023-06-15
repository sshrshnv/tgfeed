import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements'

import * as layoutCSS from '../layout.sss'
import * as logoCSS from './logo.sss'

export const Logo: Component = () => {
  return (
    <div class={clsx(
      layoutCSS.flex,
      layoutCSS.flexCenter,
      logoCSS.base
    )}>
      <Icon icon='logo'/>
    </div>
  )
}
