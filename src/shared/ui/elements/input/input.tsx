import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as animationCSS from '../../animations/animations.sss'
import * as layoutCSS from '../layout.sss'
import * as inputCSS from './input.sss'

export type InputProps = ComponentProps<'input'>

export const Input: Component<InputProps> = (_props) => {
  const [props, inputProps] = splitProps(_props, [
    'class', 'type', 'name', 'onInput'
  ])

  const handleInput = ev => {
    if (typeof props.onInput !== 'function') return
    props.onInput(ev.target.value || '')
  }

  return (
    <input {...inputProps}
      class={clsx(
        props.class,
        inputCSS.input,
        layoutCSS.outline,
        animationCSS.transition
      )}
      type={props.type || 'text'}
      autocomplete='off'
      onInput={handleInput}
    />
  )
}
