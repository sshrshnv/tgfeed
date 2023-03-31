import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './header.sss'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={clsx(
      styles.base
    )}>
      {props.children}
    </header>
  )
}
