import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './text.sss'

export type TextProps = {
  variant: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span class={clsx(
      styles.base,
      styles[`_${props.variant}`],
      styles[`_${props.size}`],
    )}>
      {props.children}
    </span>
  )
}
