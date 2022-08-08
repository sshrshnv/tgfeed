import type { ParentComponent } from 'solid-js'

import styles from './header.sass'

type Props = {

}

export const Header: ParentComponent<Props> = (props) => {
  return (
    <header class={styles.base}>
      {props.children}
    </header>
  )
}
