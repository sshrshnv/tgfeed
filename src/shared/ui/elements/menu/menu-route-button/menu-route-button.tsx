import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import type { IconProps } from '~/shared/ui/elements'
import { Button, Icon, Text } from '~/shared/ui/elements'

import * as menuButtonCSS from './menu-route-button.sss'

export type MenuRouteButtonProps = {
  route: Route
  variant: 'primary' | 'secondary' | 'tertiary'
  icon: IconProps['name']
  text?: string
}

export const MenuRouteButton: Component<MenuRouteButtonProps> = (props) => {
  return (
    <Button
      class={menuButtonCSS.base}
      route={props.route}
    >
      <Icon
        class={clsx(
          menuButtonCSS.icon,
          menuButtonCSS[`_${props.variant}`]
        )}
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
      <Icon
        class={menuButtonCSS.arrow}
        name='arrowRight'
        size='small'
      />
    </Button>
  )
}
