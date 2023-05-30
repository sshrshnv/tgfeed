import type { FlowComponent } from 'solid-js'
import { clsx } from 'clsx'

import textCSS from './text.sss'

export type TextProps = {
  class?: string
  variant: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span class={clsx(
      props.class,
      textCSS.base,
      textCSS[`_${props.variant}`],
      textCSS[`_${props.size}`]
    )}>
      {props.children}
    </span>
  )
}
