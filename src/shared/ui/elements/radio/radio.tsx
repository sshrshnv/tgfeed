import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements/text'
import { Icon } from '~/shared/ui/elements/icon'
import { Input } from '~/shared/ui/elements/input'

import * as layoutCSS from '../layout.sss'
import * as radioCSS from './radio.sss'

export type RadioProps = Omit<ComponentProps<'input'>, 'onChange'> & {
  text?: string
  onChange?: (value) => void
}

export const Radio: Component<RadioProps> = (_props) => {
  const [props, inputProps] = splitProps(_props, [
    'class', 'text', 'checked', 'onChange'
  ])

  const handleChange = ev => {
    if (typeof props.onChange !== 'function') return
    props.onChange?.(ev.target.value)
  }

  return (
    <label class={clsx(
      props.class,
      props.checked && radioCSS._checked,
      radioCSS.base,
      layoutCSS.flex
    )}>
      <Icon
        class={radioCSS.icon}
        name={`radio${props.checked ? 'On' : 'Off'}`}
        size='small'
      />
      <Text
        class={radioCSS.text}
        variant='label'
        size='large'
      >
        {props.text}
      </Text>
      <Input {...inputProps}
        type='radio'
        onChange={handleChange}
        transparent
      />
    </label>
  )
}
