import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/elements'

import layoutCSS from '../layout.sss'
import radioCSS from './radio.sss'

type Props = {
  name: string
  value: string
  items: {
    value: string
    title: string
  }[]
  onChange: (value: string) => void
}

export const Radio: Component<Props> = (props) => {
  const handleChange = ev => {
    props.onChange(ev.currentTarget.value)
  }

  return (
    <div
      class={clsx(
        layoutCSS.flex,
        radioCSS.base
      )}
      role='radiogroup'
    >
      <For each={props.items}>{item => (
        <label class={clsx(
          layoutCSS.flex,
          layoutCSS.flexCenter,
          layoutCSS.after,
          radioCSS.item,
          item.value === props.value && radioCSS._checked
        )}>
          <Text variant='label' size='large'>
            {item.title}
          </Text>
          <input
            class={layoutCSS.hidden}
            name={props.name}
            value={item.value}
            checked={item.value === props.value}
            onChange={handleChange}
            type='radio'
          />
        </label>
      )}</For>
    </div>
  )
}
