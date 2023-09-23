import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'

import * as feedPostsUpdateButtonCSS from './feed-posts-update-button.sss'

export type FeedPostsUpdateButtonProps = {
  visible?: boolean
  onClick?: () => void
}

export const FeedPostsUpdateButton: Component<FeedPostsUpdateButtonProps> = (props) => {
  return (
    <Button
      class={clsx(
        feedPostsUpdateButtonCSS.base,
        props.visible && feedPostsUpdateButtonCSS._visible
      )}
      onClick={props.onClick}
      stopPropagation
    >
      <Text variant='label' size='medium'>
        {localeState.texts?.feed.buttons.loadUpdates}
      </Text>
    </Button>
  )
}
