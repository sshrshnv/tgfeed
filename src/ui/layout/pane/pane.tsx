import type { ParentComponent } from 'solid-js'
import { onMount, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { isIOS } from '~/utils'
import { Block } from '~/ui/layout'
import { scrollStyles, animationStyles } from '~/ui/styles'

import styles from './pane.sss'

type Props = {
  active: boolean
  onMount: () => void
  onCleanup: () => void
}

const animationKeyframes = [
  { transform: 'translateX(80px)', opacity: 0 },
  { transform: 'translateX(0)', opacity: 1 }
]

const animationOptions = {
  duration: 200,
  fill: 'forwards' as FillMode,
  easing: 'ease-in-out'
}

export const Pane: ParentComponent<Props> = (props) => {
  let element: HTMLDivElement
  let animation: Animation

  onMount(() => {
    props.onMount()

    animation = element.animate(
      animationKeyframes,
      animationOptions
    )
  })

  createEffect(() => {
    if (props.active) return

    animation.reverse()
    animation.finished.then(() =>
      props.onCleanup()
    )
  })

  return (
    <Block
      ref={element!}
      class={clsx(
        styles.base,
        scrollStyles.base,
        scrollStyles._hidden,
        isIOS() && animationStyles.performance
      )}
      absolute
    >
      {props.children}
    </Block>
  )
}
