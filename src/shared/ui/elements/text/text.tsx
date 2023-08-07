import type { FlowComponent, ComponentProps } from 'solid-js'
import { clsx } from 'clsx'

import * as textCSS from './text.sss'

export type TextProps = ComponentProps<'span'> & {
  variant: 'display' | 'headline' | 'title' | 'label' | 'body'
  size: 'large' | 'medium' | 'small'
  center?: boolean
  uppercase?: boolean
  ellipsis?: boolean
}

export const Text: FlowComponent<TextProps> = (props) => {
  return (
    <span {...props} class={clsx(
      props.class,
      props.center && textCSS._center,
      props.uppercase && textCSS._uppercase,
      props.ellipsis && textCSS._ellipsis,
      textCSS.base,
      textCSS[`_${props.variant}`],
      textCSS[`_${props.size}`]
    )}/>
  )
}
