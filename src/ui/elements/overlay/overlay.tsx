import type { Component } from 'solid-js'
import { onMount, createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { Block } from '~/ui/layout'
import { platformStyles } from '~/ui/styles'

import styles from './overlay.sss'

export type OverlayProps = {
  class?: string
  active?: boolean
  platform?: 'mobile' | 'desktop'
  onClick?: () => void
}

const animationKeyframes = [
  { backgroundColor: 'transparent' },
  { backgroundColor: 'var(--overlay-bg-color)' }
]

const animationOptions = {
  duration: 180,
  fill: 'forwards' as FillMode,
  easing: 'ease-in'
}

export const Overlay: Component<OverlayProps> = (props) => {
  let element: HTMLDivElement
  let animation: Animation

  onMount(() => {
    animation = element.animate(
      animationKeyframes,
      animationOptions
    )
  })

  createEffect(() => {
    if (props.active) return
    animation.reverse()
  })

  const handleClick = () => {
    props.onClick?.()
  }

  return (
    <Block
      ref={element!}
      class={clsx(
        props.class,
        styles.base,
        props.platform && platformStyles[props.platform]
      )}
      absolute
      fullScreenPosition
      onClick={handleClick}
    />
  )
}
