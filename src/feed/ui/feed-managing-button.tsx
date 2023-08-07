import type { Component } from 'solid-js'

import { Button, Icon } from '~/shared/ui/elements'

import { feedState } from '../feed-state'
import { feedRoutes } from '../feed-routes'

export type FeedManagingButtonProps = {
  class: string
}

export const FeedManagingButton: Component<FeedManagingButtonProps> = (props) => {
  return (
    <Button
      class={props.class}
      route={feedRoutes.managingDialog}
      disabled={feedState.initialLoading}
    >
      <Icon name='settings' size='large'/>
    </Button>
  )
}
