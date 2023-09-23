import type { Component, ComponentProps } from 'solid-js'
import { splitProps, createSignal, createEffect } from 'solid-js'
import { mergeRefs } from '@solid-primitives/refs'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as inputCSS from './input.sss'

export type InputProps = ComponentProps<'input'> & {
  transparent?: boolean
}

export const Input: Component<InputProps> = (_props) => {
  const [props, inputProps] = splitProps(_props, [
    'class', 'ref', 'type', 'transparent'
  ])

  const [getEl, setEl] = createSignal<HTMLInputElement>()

  createEffect(() => {
    if (!inputProps.autofocus) return
    const el = getEl()
    el && self.setTimeout(() => el.focus(), 0)
  })

  return (
    <input {...inputProps}
      class={clsx(
        props.class,
        props.transparent && inputCSS._transparent,
        inputCSS.input,
        layoutCSS.outline
      )}
      ref={mergeRefs(props.ref, setEl)}
      type={props.type || 'text'}
      autocomplete='off'
    />
  )
}
