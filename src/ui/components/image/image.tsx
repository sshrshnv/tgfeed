import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import CSS from './image.sss'

type Props = {
  src: string
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
        CSS.base,
        props.fadeIn && CSS._faded,
        isLoaded() && CSS._loaded,
        isReady() && CSS._ready
      )}
      src={props.src}
      onLoad={handleLoad}
      onTransitionEnd={handleTransitionEnd}
    />
  )
}
