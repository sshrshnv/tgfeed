import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import { coreRoutes } from '../core-routes'

import * as coreMenuButtonCSS from './core-menu-button.sss'

export type CoreMenuButtonProps = {
  class?: string
}

export const CoreMenuButton: Component<CoreMenuButtonProps> = (props) => {
  return (
    <Button
      class={clsx(
        props.class,
        coreMenuButtonCSS.base
      )}
      route={coreRoutes.menuDialog}
      opacity={false}
    >
      <Icon name='menu' size='large'/>
    </Button>
  )
}
