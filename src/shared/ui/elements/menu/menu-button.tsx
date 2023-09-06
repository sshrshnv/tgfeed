import type { Component } from 'solid-js'

import type { Route } from '~/shared/routing'
import type { ButtonProps } from '~/shared/ui/elements/button'
import { Button } from '~/shared/ui/elements/button'
import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

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
      onClick={props.onClick}
    >
      <Icon
        class={menuButtonCSS.icon}
        name={props.icon}
        size='medium'
      />
      <Text
        class={menuButtonCSS.text}
        variant='label'
        size='large'
      >
        {props.text}
      </Text>
    </Button>
  )
}
