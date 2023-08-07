import type { Component } from 'solid-js'
import { createSignal, onMount } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as progressCSS from './progress.sss'

export type ProgressProps = {
  class?: string
  active: boolean
  onTransitionEnd?: () => void
}

export const Progress: Component<ProgressProps> = (props) => {
  let element!: HTMLDivElement
  const [isActive, setActive] = createSignal(false)

  onMount(() => {
    element.onanimationstart = () => setActive(true)
    element.onanimationiteration = () => {
      if (props.active) return
      setActive(false)
    }
  })

  return (
    <div
      class={clsx(
        props.class,
        (props.active || isActive()) && progressCSS._animated,
        progressCSS.base,
        layoutCSS.before,
        layoutCSS.after
      )}
      ref={element}
    />
  )
}
