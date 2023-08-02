import type { Component } from 'solid-js'
import { For } from 'solid-js'

import { Radio, RadioProps } from '~/shared/ui/elements'

import * as menuRadioGroupCSS from './menu-radio-group.sss'

export type MenuRadioGroupProps = {
  value: RadioProps['value']
  name: RadioProps['name']
  items: RadioProps[]
  onChange: RadioProps['onChange']
}

export const MenuRadioGroup: Component<MenuRadioGroupProps> = (props) => {
  return (
    <div
      class={menuRadioGroupCSS.base}
      role='radiogroup'
    >
      <For each={props.items}>
        {item => (
          <Radio {...item}
            name={props.name}
            checked={props.value === item.value}
            onChange={props.onChange}
          />
        )}
      </For>
    </div>
  )
}
