import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import imageCSS from './image.sss'

type Props = {
  src: string
  alt: string
  class?: string
  fadeIn?: boolean
  onLoad?: () => void
}

export const Image: Component<Props> = (props) => {
  const [isLoaded, setLoaded] = createSignal(false)
  const [isReady, setReady] = createSignal(false)

  const handleLoad = () => {
    props.onLoad?.()
    if (!props.fadeIn || props.onLoad) return
    setLoaded(true)
  }

  const handleTransitionEnd = () => {
    setReady(true)
  }

  return (
    <img
      class={clsx(
        props.class,
        imageCSS.base,
        props.fadeIn && imageCSS._faded,
        isLoaded() && imageCSS._loaded,
        isReady() && imageCSS._ready
      )}
      src={props.src}
      alt={props.alt}
      onLoad={handleLoad}
      onTransitionEnd={handleTransitionEnd}
    />
  )
}
