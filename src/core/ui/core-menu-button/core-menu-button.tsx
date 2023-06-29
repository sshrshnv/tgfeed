import type { Component } from 'solid-js'

import { Button, Icon } from '~/shared/ui/elements'

import { coreRoutes } from '../../core.routes'
import * as coreMenuButtonCSS from './core-menu-button.sss'

export const CoreMenuButton: Component = () => {
  return (
    <Button
      class={coreMenuButtonCSS.button}
      route={coreRoutes.menuDialog}
    >
      <Icon name='menu' size='large'/>
    </Button>
  )
}
