import type { Component } from 'solid-js'

import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import { coreRoutes } from '../core-routes'

export type CoreMenuButtonProps = {
  class: string
}

export const CoreMenuButton: Component<CoreMenuButtonProps> = (props) => {
  return (
    <Button
      class={props.class}
      route={coreRoutes.menuDialog}
    >
      <Icon name='menu' size='large'/>
    </Button>
  )
}
