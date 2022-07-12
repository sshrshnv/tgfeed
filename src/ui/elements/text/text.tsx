import type { FlowComponent } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import type { ElementStyleProps } from '~/ui/styles'
import { clsxElementStyles } from '~/ui/styles'

type Props = ElementStyleProps & {
  element?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
}

export const Text: FlowComponent<Props> = (allProps) => {
  const [props, styleProps] = splitProps(allProps, ['children', 'element'])

  const generateClass = createMemo(() =>
    clsxElementStyles(styleProps)
  )

  return (
    <Dynamic
      component={props.element || 'span'}
      class={generateClass()}
    >
      {props.children}
    </Dynamic>
  )
}
