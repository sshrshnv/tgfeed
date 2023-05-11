import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/elements'

import layoutStyles from '../layout.sss'
import filterStyles from './filter.sss'

type Props = {
  name: string
  value: string
  items: {
    value: string
    title: string
  }[]
  onChange: (value: string) => void
}

export const Filter: Component<Props> = (props) => {
  const handleChange = ev => {
    props.onChange(ev.currentTarget.value)
  }

  return (
    <div
      class={filterStyles.base}
      role='radiogroup'
    >
      <For each={props.items}>{item => (
        <label class={clsx(
          layoutStyles.flexCenter,
          layoutStyles.after,
          filterStyles.item,
          item.value === props.value && filterStyles._checked
        )}>
          <Text variant='label' size='large'>
            {item.title}
          </Text>
          <input
            class={layoutStyles.hidden}
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
