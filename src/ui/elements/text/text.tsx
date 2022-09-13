import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './text.sss'

type Props = {
  class?: string
  uppercase?: boolean
}

export const Text: FlowComponent<Props> = (props) => {
  return (
    <span class={clsx(
      props.class,
      props.uppercase && styles._uppercase
    )}>
      {props.children}
    </span>
  )
}
