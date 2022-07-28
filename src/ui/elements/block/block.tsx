import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './block.sass'

type Props = {
  class?: string

  absolute?: boolean
  relative?: boolean
  fullScreenPosition?: boolean

  flex?: boolean
  flexColumn?: boolean
  flexJustifyCenter?: boolean
  flexAlignCenter?: boolean

  fullWidth?: boolean
  fullHeight?: boolean
}

export const Block: ParentComponent<Props> = (props) => {
  return (
    <div class={clsx(
      props.class,

      props.absolute && styles._absolute,
      props.relative && styles._relative,
      props.fullScreenPosition && styles._fullScreenPosition,

      props.flex && styles._flex,
      props.flexColumn && styles._flexColumn,
      props.flexJustifyCenter && styles._flexJustifyCenter,
      props.flexAlignCenter && styles._flexAlignCenter,

      props.fullWidth && styles._fullWidth,
      props.fullHeight && styles._fullHeight
    )}>
      {props.children}
    </div>
  )
}
