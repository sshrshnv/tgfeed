import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/elements'

import layoutStyles from '../layout.sss'
import logoStyles from './logo.sss'

export const Logo: Component = () => {
  return (
    <div class={clsx(
      layoutStyles.flexCenter,
      logoStyles.base
    )}>
      <Icon icon='logo'/>
    </div>
  )
}
