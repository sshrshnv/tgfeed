import type { Component } from 'solid-js'

import type { Route } from '~/shared/routing'
import type { ButtonProps, IconProps } from '~/shared/ui/elements'
import { Button, Icon, Text } from '~/shared/ui/elements'

import * as menuButtonCSS from './menu-button.sss'

export type MenuButtonProps = {
  route?: Route
  icon: IconProps['name']
  text?: string
  onClick?: ButtonProps['onClick']
}

export const MenuButton: Component<MenuButtonProps> = (props) => {
  return (
    <Button
      class={menuButtonCSS.base}
      route={props.route}
    >
      <Icon
        class={menuButtonCSS.icon}
        name={props.icon}
        size='large'
      />
      <Text
        variant='label'
        size='large'
      >
        {props.text}
      </Text>
    </Button>
  )
}
