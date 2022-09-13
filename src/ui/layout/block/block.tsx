import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import styles from './block.sss'

type Props = {
  ref?: HTMLDivElement
  class?: string

  absolute?: boolean
  relative?: boolean
  fixed?: boolean
  fullScreenPosition?: boolean

  flex?: boolean
  flexColumn?: boolean
  flexJustifyCenter?: boolean
  flexJustifyBetween?: boolean
  flexAlignCenter?: boolean

  fullWidth?: boolean
  fullHeight?: boolean

  onClick?: () => void
}

export const Block: ParentComponent<Props> = (props) => {
  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <div
      ref={props.ref}
      class={clsx(
        props.class,

        props.absolute && styles._absolute,
        props.relative && styles._relative,
        props.fixed && styles._fixed,
        props.fullScreenPosition && styles._fullScreenPosition,

        props.flex && styles._flex,
        props.flexColumn && styles._flexColumn,
        props.flexJustifyCenter && styles._flexJustifyCenter,
        props.flexJustifyBetween && styles._flexJustifyBetween,
        props.flexAlignCenter && styles._flexAlignCenter,

        props.fullWidth && styles._fullWidth,
        props.fullHeight && styles._fullHeight
      )}
      onClick={handleClick}
    >
      {props.children}
    </div>
  )
}
