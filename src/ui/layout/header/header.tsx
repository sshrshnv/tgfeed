import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { overlayStyles } from '~/ui/styles'

import styles from './header.sass'

export const Header: ParentComponent = (props) => {
  return (
    <header class={clsx(
      styles.base,
      overlayStyles.base,
      overlayStyles._top
    )}>
      {props.children}
    </header>
  )
}
