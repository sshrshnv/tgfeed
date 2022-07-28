import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

type Props = {
  class?: string
}

export const Text: FlowComponent<Props> = (props) => {
  return (
    <span class={clsx(
      props.class
    )}>
      {props.children}
    </span>
  )
}
