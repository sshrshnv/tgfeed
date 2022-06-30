import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import cl from 'clsx'

import classes from './image.styl'

type Props = {
  src: string
  class?: string
  onLoad?: () => void
}

export const Image: Component<Props> = (props) => {
  const [isLoaded, setLoaded] = createSignal(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <img
      class={cl(
        classes.root,
        isLoaded() && classes._loaded,
        props.class
      )}
      src={props.src}
      onLoad={handleLoad}
    />
  )
}
