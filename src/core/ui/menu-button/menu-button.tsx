import type { Component } from 'solid-js'

import { routes } from '~/core/routes'
import { Button, Icon } from '~/shared/ui/elements'

import * as menuButtonCSS from './menu-button.sss'

export const MenuButton: Component = () => {
  return (
    <Button
      class={menuButtonCSS.button}
      route={routes.menu}
    >
      <Icon name='menu' size='large'/>
    </Button>
  )
}
