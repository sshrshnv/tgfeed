import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Button, Icon, Text } from '~/shared/ui/elements'

import type { PostUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { formatPostDate } from '../utils'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsItemCSS from './feed-posts-item-header.sss'

export type FeedPostsItemHeaderProps = {
  class?: string
  uuid: PostUuid
  visible?: boolean
}

export const FeedPostsItemHeader: Component<FeedPostsItemHeaderProps> = (props) => {
  const getPost = createMemo(() =>
    feedState.posts[props.uuid]
  )

  const getDate = createMemo(() =>
    formatPostDate(getPost().date, { time: true })
  )

  const getChannelId = createMemo(() =>
    getPost().peer_id.channel_id
  )

  const getChannelTitle = createMemo(() =>
    feedState.channels[getChannelId()].title
  )

  return (
    <header class={clsx(
      props.class,
      feedPostsItemCSS.base,
      layoutCSS.flex
    )}>
      <FeedChannelCover
        channelId={getChannelId()}
        size='medium'
        visible={props.visible}
      />

      <div class={clsx(
        feedPostsItemCSS.description,
        layoutCSS.flex
      )}>
        <Text variant='label' size='medium' ellipsis>
          {getChannelTitle()}
        </Text>
        <Text variant='label' size='small'>
          {getDate()}
        </Text>
      </div>

      <Button
        class={feedPostsItemCSS.button}
      >
        <Icon name='more' size='medium'/>
      </Button>
    </header>
  )
}
