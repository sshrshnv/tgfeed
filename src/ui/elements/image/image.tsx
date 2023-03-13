import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import styles from './image.sss'

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
        styles.base,
        props.fadeIn && styles._faded,
        isLoaded() && styles._loaded,
        isReady() && styles._ready
      )}
      src={props.src}
      onLoad={handleLoad}
      onTransitionEnd={handleTransitionEnd}
    />
  )
}
