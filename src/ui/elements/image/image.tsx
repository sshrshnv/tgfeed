import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import styles from './image.sss'

type Props = {
  class?: string
  fadeIn?: boolean
  src: string
  onLoad?: () => void
}

export const Image: Component<Props> = (props) => {
  const [isLoaded, setLoaded] = createSignal(false)
  const [isReady, setReady] = createSignal(false)

  const handleLoad = () => {
    props.onLoad?.()

    if (!props.fadeIn || props.onLoad) return

    setLoaded(true)
    setTimeout(() => {
      setReady(true)
    }, 400)
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
    />
  )
}
