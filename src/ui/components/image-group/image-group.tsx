import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import layoutStyles from '~/ui/styles/layout.styles.sss'

import styles from './image-group.sss'

type Props = {

}

export const ImageGroup: ParentComponent<Props> = (props) => {
  return (
    <div class={clsx(
      layoutStyles.after,
      styles.base
    )}>
      {props.children}
    </div>
  )
}
