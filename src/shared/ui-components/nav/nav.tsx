import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './nav.sss'

type Props = {
  //active?: boolean
}

export const Nav: ParentComponent<Props> = (props) => {
  return (
    <nav class={clsx(
      styles.base
    )}>
      {props.children}
    </nav>
  )
}
