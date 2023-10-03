import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Button } from '~/shared/ui/elements/button'
import { Icon } from '~/shared/ui/elements/icon'

import { Folder } from '../feed.types'
import { feedState } from '../feed-state'

import * as feedPostsControlsCSS from './feed-posts-controls.sss'

export type FeedPostsControlsProps = {
  folderId: Folder['id']
  scrollVisible?: boolean
  updateVisible?: boolean
  scroll?: () => void
  update?: () => void
}

export const FeedPostsControls: Component<FeedPostsControlsProps> = (props) => {
  const isVisible = () =>
    props.scrollVisible || props.updateVisible

  const hasOffset = () =>
    feedState.scrolling[props.folderId] <= 0

  return (
    <div class={clsx(
      feedPostsControlsCSS.base,
      isVisible() && feedPostsControlsCSS._visible,
      hasOffset() && feedPostsControlsCSS._offset
    )}>
      <Button
        class={clsx(
          feedPostsControlsCSS.button,
          !props.scrollVisible && feedPostsControlsCSS._hidden
        )}
        onClick={props.scroll}
      >
        <Icon name='arrowUp' size='medium'/>
      </Button>

      <Button
        class={clsx(
          feedPostsControlsCSS.button,
          !props.updateVisible && feedPostsControlsCSS._hidden,
          feedPostsControlsCSS._primary
        )}
        onClick={props.update}
      >
        <Icon name='refresh' size='medium'/>
      </Button>
    </div>
  )
}
