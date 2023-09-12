import type { ParentComponent } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import * as sliderItemCSS from './slider-item.sss'

export type SliderItemProps = {
  single?: boolean
  previous?: boolean
  active?: boolean
  next?: boolean
  translateX?: number
}

export const SliderItem: ParentComponent<SliderItemProps> = (props) => {
  const getStyles = createMemo(() => props.active ? {
    translate: `${props.translateX}px 0`
  } : {})

  return (
    <div
      class={clsx(
        sliderItemCSS.base,
        props.single && sliderItemCSS._single,
        props.previous && sliderItemCSS._previous,
        props.active && sliderItemCSS._active,
        props.next && sliderItemCSS._next,
        !props.translateX && sliderItemCSS._transitionable,
      )}
      style={getStyles()}
    >
      {props.children}
    </div>
  )
}
