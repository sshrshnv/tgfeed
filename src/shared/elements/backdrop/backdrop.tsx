import type { Component } from 'solid-js'
import { onMount, createEffect } from 'solid-js'

import backdropCSS from './backdrop.sss'

export type BackdropProps = {
  active?: boolean
  platform?: 'mobile' | 'desktop'
  onClick?: () => void
}

const animationKeyframes = [
  { backgroundColor: 'transparent' },
  { backgroundColor: 'var(--backdrop-bg-color)' }
]

const animationOptions = {
  duration: 180,
  fill: 'forwards' as FillMode,
  easing: 'ease-in'
}

export const Backdrop: Component<BackdropProps> = (props) => {
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
    <div
      ref={element!}
      class={backdropCSS.base}
      onClick={handleClick}
    />
  )
}
