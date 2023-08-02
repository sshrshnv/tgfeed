import type { ParentComponent, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as asideCSS from './aside.sss'

export type AsideProps = ComponentProps<'aside'> & {
  position: 'left' | 'right'
}

export const Aside: ParentComponent<AsideProps> = (_props) => {
  const [props, asideProps] = splitProps(_props, [
    'class', 'position'
  ])

  return (
    <aside {...asideProps}
      class={clsx(
        asideCSS.base,
        asideCSS[`_${props.position}`]
      )}
    />
  )
}
