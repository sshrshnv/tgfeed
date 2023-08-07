import type { Component } from 'solid-js'
import { createEffect } from 'solid-js'
import { clsx } from 'clsx'

import { blurImage } from '~/shared/ui/utils'

import * as imageCSS from './image.sss'

export type BluredImageProps = {
  class?: string
  src: string
  width: number
  height: number
  radius: number
}

export const BluredImage: Component<BluredImageProps> = (props) => {
  let canvasEl!: HTMLCanvasElement

  createEffect(() => {
    if (!props.src) return
    blurImage({
      canvasEl,
      src: props.src,
      width: props.width,
      height: props.height,
      radius: props.radius
    })
  })

  return (
    <canvas
      class={clsx(
        props.class,
        imageCSS._blured
      )}
      ref={canvasEl}
      width={props.width}
      height={props.height}
    />
  )
}
