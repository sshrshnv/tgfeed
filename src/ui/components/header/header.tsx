import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import barStyles from '~/ui/styles/bar.styles.sss'

import styles from './header.sss'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={clsx(
      barStyles.base,
      styles.base
    )}>
      {props.children}
    </header>
  )
}
