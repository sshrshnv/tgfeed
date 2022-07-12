import type { ParentComponent } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'

import type { ElementStyleProps } from '~/ui/styles'
import { clsxElementStyles } from '~/ui/styles'

export const Block: ParentComponent<ElementStyleProps> = (allProps) => {
  const [props, styleProps] = splitProps(allProps, ['children'])

  const generateClass = createMemo(() =>
    clsxElementStyles(styleProps)
  )

  return (
    <div
      class={generateClass()}
    >
      {props.children}
    </div>
  )
}
