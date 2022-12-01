import type { ParentComponent } from 'solid-js'

import styles from './card.sss'

type Props = {

}

export const Card: ParentComponent<Props> = (props) => {
  return (
    <div
      class={styles.base}
    >
      {props.children}
    </div>
  )
}
