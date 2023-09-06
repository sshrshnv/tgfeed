import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { clsx } from 'clsx'

import * as imageCSS from './image.sss'

type Props = {
  src: string
  alt: string
  class?: string
  onLoad?: () => void
}

export const Image: Component<Props> = (props) => {
  const [isLoaded, setLoaded] = createSignal(false)

  const handleLoad = () => {
    props.onLoad?.()
    setLoaded(true)
  }

  return (
    <img
      class={clsx(
        props.class,
        imageCSS.base,
        isLoaded() && imageCSS._loaded,
      )}
      src={props.src}
      alt={props.alt}
      onLoad={handleLoad}
    />
  )
}
