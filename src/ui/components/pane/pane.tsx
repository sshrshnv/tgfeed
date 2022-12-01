import type { ParentComponent } from 'solid-js'

import styles from './pane.sss'

type Props = {

}

export const Pane: ParentComponent<Props> = (props) => {
  return (
    <div class={styles.base}>
      <div class={styles.body}>
        {props.children}
      </div>
    </div>
  )
}
