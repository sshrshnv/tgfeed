import type { FlowComponent, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as textCSS from './text.sss'

export type TextProps = ComponentProps<'span'> & {
  variant: 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span {...props} class={clsx(
      props.class,
      textCSS.base,
      textCSS[`_${props.variant}`],
      textCSS[`_${props.size}`]
    )}>
      {props.children}
    </span>
  )
}
