import type { Component } from 'solid-js'

import { Button, Chip } from '~/shared/elements'

export const FeedIntervalMenu: Component = (props) => {
  return (
    <Button
      iconName='history'
    >
      <Chip text='24 hours'/>
    </Button>
  )
}
