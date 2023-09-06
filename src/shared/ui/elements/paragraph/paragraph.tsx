import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as paragraphCSS from './paragraph.sss'

export type ParagraphProps = ComponentProps<'p'> & {
  size: 'large' | 'medium' | 'small'
}

export const Paragraph: Component<ParagraphProps> = (_props) => {
  const [props, paragraphProps] = splitProps(_props, [
    'class', 'size'
  ])

  return (
    <p {...paragraphProps} class={clsx(
      props.class,
      paragraphCSS.base,
      paragraphCSS[`_${props.size}`]
    )}/>
  )
}
