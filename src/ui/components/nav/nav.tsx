import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import barStyles from '~/ui/styles/bar.styles.sss'

import styles from './nav.sss'

type Props = {
  //active?: boolean
}

export const Nav: ParentComponent<Props> = (props) => {
  return (
    <nav class={clsx(
      barStyles.base,
      styles.base
    )}>
      {props.children}
    </nav>
  )
}
