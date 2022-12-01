import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/ui/components'
import layoutStyles from '~/ui/styles/layout.styles.sss'

import styles from './logo.sss'

export const Logo: Component = () => {
  return (
    <div class={clsx(
      layoutStyles.flexCenter,
      styles.base
    )}>
      <Icon icon="logo"/>
    </div>
  )
}
