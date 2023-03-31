import type { ParentComponent } from 'solid-js'

import styles from './main.sss'

export const Main: ParentComponent = (props) => {
  return (
    <main class={styles.base}>
      {props.children}
    </main>
  )
}
