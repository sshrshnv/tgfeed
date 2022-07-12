import type { ParentComponent } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'

import type { ElementStyleProps } from '~/ui/styles'
import { clsxElementStyles } from '~/ui/styles'

export const Content: ParentComponent<ElementStyleProps> = (allProps) => {
  const [props, styleProps] = splitProps(allProps, ['children'])

  const generateClass = createMemo(() =>
    clsxElementStyles({
      width: '100%',
      height: '100%',
      ...styleProps
    })
  )

  return (
    <main
      class={generateClass()}
    >
      {props.children}
    </main>
  )
}
