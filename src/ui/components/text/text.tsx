import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import CSS from './text.sss'

export type TextProps = {
  variant: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span class={clsx(
      CSS.base,
      CSS[`_${props.variant}`],
      CSS[`_${props.size}`],
    )}>
      {props.children}
    </span>
  )
}
