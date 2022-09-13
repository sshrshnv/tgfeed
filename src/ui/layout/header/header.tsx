import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { actionBarStyles, animationStyles } from '~/ui/styles'

import styles from './header.sss'

export const Header: ParentComponent = (props) => {
  return (
    <header class={clsx(
      styles.base,
      actionBarStyles.base,
      actionBarStyles._top,
      animationStyles.performance
    )}>
      {props.children}
    </header>
  )
}
