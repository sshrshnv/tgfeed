import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import textStyles from './text.sss'

export type TextProps = {
  variant: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span class={clsx(
      textStyles.base,
      textStyles[`_${props.variant}`],
      textStyles[`_${props.size}`],
    )}>
      {props.children}
    </span>
  )
}
