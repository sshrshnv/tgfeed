import type { Component } from 'solid-js'
import { createSignal, createMemo, splitProps } from 'solid-js'

import type { ElementStyleProps } from '~/ui/styles'
import { clsxElementStyles } from '~/ui/styles'

type Props = ElementStyleProps & {
  src: string
  onLoad?: () => void
}

export const Image: Component<Props> = (allProps) => {
  const [props, styleProps] = splitProps(allProps, ['src', 'onLoad'])
  const [isLoaded, setLoaded] = createSignal(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const generateClass = createMemo(() =>
    clsxElementStyles({
      display: 'block',
      opacity: isLoaded() ? "1" : "0",
      transition: "opacity 400ms ease-in",
      willChange: "opacity",
      ...styleProps
    })
  )

  return (
    <img
      class={generateClass()}
      src={props.src}
      onLoad={handleLoad}
    />
  )
}
