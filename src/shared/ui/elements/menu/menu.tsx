import type { Component, ComponentProps } from 'solid-js'
import { For } from 'solid-js'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import type { IconProps } from '~/shared/ui/elements'
import { Button, Icon, Text } from '~/shared/ui/elements'

import * as layoutCSS from '../layout.sss'
import * as menuCSS from './menu.sss'

type MenuItemProps = {
  route?: Route
  icon: IconProps['name']
  text: string
}

export type MenuProps = ComponentProps<'menu'> & {
  items: MenuItemProps[]
}

export const Menu: Component<MenuProps> = (props) => {
  return (
    <menu class={clsx(
      props.class,
      menuCSS.base,
      layoutCSS.flex
    )}>
      <For each={props.items}>
        {item => (
          <Button
            class={menuCSS.item}
            route={item.route}
          >
            <Icon class={menuCSS.icon} name={item.icon} size='large'/>
            <Text variant='label' size='large'>
              {item.text}
            </Text>
          </Button>
        )}
      </For>
    </menu>
  )
}
