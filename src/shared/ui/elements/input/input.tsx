import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as layoutCSS from '../layout.sss'
import * as inputCSS from './input.sss'

export type InputProps = ComponentProps<'input'>

export const Input: Component<InputProps> = (_props) => {
  const [props, inputProps] = splitProps(_props, [
    'class', 'type', 'name'
  ])

  return (
    <input {...inputProps}
      class={clsx(
        props.class,
        inputCSS.input,
        layoutCSS.outline
      )}
      type={props.type || 'text'}
      autocomplete='off'
    />
  )
}