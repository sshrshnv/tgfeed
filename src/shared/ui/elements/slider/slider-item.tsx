import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils'

import * as animationsCSS from '../../animations/animations.sss'
import * as sliderItemCSS from './slider-item.sss'

export type SliderItemProps = {
  previous?: boolean
  active?: boolean
  next?: boolean
  transitionable?: boolean
}

export const SliderItem: ParentComponent<SliderItemProps> = (props) => {
  return (
    <div class={clsx(
      sliderItemCSS.base,
      props.previous && sliderItemCSS._previous,
      props.active && sliderItemCSS._active,
      props.next && sliderItemCSS._next,
      props.transitionable && sliderItemCSS._transitionable,
      isIOS() && animationsCSS.forcedPerformance
    )}>
      {props.children}
    </div>
  )
}
