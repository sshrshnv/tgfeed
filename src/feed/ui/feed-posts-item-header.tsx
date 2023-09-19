import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements/text'

import type { PostUuid } from '../feed.types'
import { getPost, getPostChannel } from '../utils/get-feed-cache-data'
import { formatPostDate } from '../utils/format-post-date'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsItemHeaderCSS from './feed-posts-item-header.sss'

export type FeedPostsItemHeaderProps = {
  class?: string
  uuid: PostUuid
  visible?: boolean
}

export const FeedPostsItemHeader: ParentComponent<FeedPostsItemHeaderProps> = (props) => {
  const getDate = () =>
    formatPostDate(getPost(props.uuid).date, { time: true })

  const getChannelId = () =>
    getPost(props.uuid).peer_id.channel_id

  const getChannelTitle = () =>
    getPostChannel(props.uuid).title

  return (
    <header class={clsx(
      props.class,
      feedPostsItemHeaderCSS.base,
      layoutCSS.flex
    )}>
      <FeedChannelCover
        channelId={getChannelId()}
        size='medium'
        visible={props.visible}
      />

      <div class={clsx(
        feedPostsItemHeaderCSS.description,
        layoutCSS.flex
      )}>
        <Text variant='label' size='medium' ellipsis>
          {getChannelTitle()}
        </Text>
        <Text variant='label' size='small'>
          {getDate()}
        </Text>
      </div>

      {props.children}
    </header>
  )
}
