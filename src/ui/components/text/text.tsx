import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './text.sss'

type Props = {
  type: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<Props> = (props) => {
  return (
    <span class={clsx(
      styles.base,
      styles[`_${props.type}`],
      styles[`_${props.size}`],
    )}>
      {props.children}
    </span>
  )
}
