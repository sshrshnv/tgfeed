import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import type { IconProps } from '~/shared/ui/elements'
import { Text, Icon, Input } from '~/shared/ui/elements'

import * as layoutCSS from '../layout.sss'
import * as checkboxCSS from './checkbox.sss'

export type CheckboxProps = Omit<ComponentProps<'input'>, 'onChange'> & {
  icon?: IconProps['name']
  text?: string
  onChange?: (value) => void
}

export const Checkbox: Component<CheckboxProps> = (_props) => {
  const [props, inputProps] = splitProps(_props, [
    'class', 'icon', 'text', 'checked', 'onChange'
  ])

  const handleChange = ev => {
    if (typeof props.onChange !== 'function') return
    props.onChange?.(ev.target.value)
  }

  return (
    <label class={clsx(
      props.class,
      checkboxCSS.base,
      layoutCSS.flex
    )}>
      <Icon
        class={checkboxCSS.icon}
        name={props.icon || (`checkbox${props.checked ? 'On' : 'Off'}`)}
        size='medium'
      />
      <Text
        class={checkboxCSS.text}
        variant='label'
        size='large'
      >
        {props.text}
      </Text>
      <Input {...inputProps}
        type='checkbox'
        checked={props.checked}
        onChange={handleChange}
        transparent
      />
    </label>
  )
}
