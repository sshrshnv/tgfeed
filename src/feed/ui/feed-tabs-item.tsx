import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { Button, Text } from '~/shared/ui/elements'

import * as feedTabsItemCSS from './feed-tabs-item.sss'

export type FeedTabsItemProps = {
  active?: boolean
}

export const FeedTabsItem: ParentComponent<FeedTabsItemProps> = (props) => {
  return (
    <Button
      class={clsx(
        feedTabsItemCSS.base,
        props.active && feedTabsItemCSS._active
      )}
      role="tab"
    >
      <Text variant='label' size='large'>
        {props.children}
      </Text>
    </Button>
  )
}
