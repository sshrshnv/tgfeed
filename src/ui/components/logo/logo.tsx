import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/ui/components'
import { layoutCSS } from '~/ui/css'

import CSS from './logo.sss'

export const Logo: Component = () => {
  return (
    <div class={clsx(
      layoutCSS.flexCenter,
      CSS.base
    )}>
      <Icon icon='logo'/>
    </div>
  )
}
