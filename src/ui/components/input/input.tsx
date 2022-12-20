import type { Component } from 'solid-js'

import CSS from './input.sss'

type Props = {
  class?: string
  value?: string
  error?: string | boolean
  label?: string
  placeholder?: string
  type?: string
  icon?: string
  autoComplete?: string
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  autoFocus?: boolean
  fakeFocus?: boolean
  clear?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onInput?: (value: string) => void
  onIconClick?: () => void
}

export const Input: Component<Props> = (props) => {
  const handleInput = ev => {
    props.onInput?.(ev.target.value || '')
  }

  return null /*(
    <Block>
      <input
        class={CSS.field}
        onInput={handleInput}
      />
    </Block>
  )*/
}
