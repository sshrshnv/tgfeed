import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import { feedState } from '../feed-state'
import { feedRoutes } from '../feed-routes'

import * as feedMenuButtonCSS from './feed-menu-button.sss'

export type FeedMenuButtonProps = {
  class?: string
}

export const FeedMenuButton: Component<FeedMenuButtonProps> = (props) => {
  return (
    <Button
      class={clsx(
        props.class,
        feedMenuButtonCSS.base
      )}
      route={feedRoutes.dialog}
      disabled={feedState.initialLoading}
      opacity={false}
    >
      <Icon name='settings' size='large'/>
    </Button>
  )
}
