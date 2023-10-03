import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { Button } from '~/shared/ui/elements/button'
import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'
import { Text } from '~/shared/ui/elements/text'

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
      autofocus={false}
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
        variant='label'
        size='large'
      >
        {props.text}
      </Text>
      <Icon
        class={menuButtonCSS.arrowIcon}
        name='arrowRight'
        size='small'
      />
    </Button>
  )
}
