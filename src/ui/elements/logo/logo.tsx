import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/ui/elements'

import layoutStyles from '../layout.sss'
import styles from './logo.sss'

export const Logo: Component = () => {
  return (
    <div class={clsx(
      layoutStyles.flexCenter,
      styles.base
    )}>
      <Icon icon='logo'/>
    </div>
  )
}
