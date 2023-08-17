import type { Component } from 'solid-js'
import { createMemo, onMount, onCleanup } from 'solid-js'

import { Text } from '~/shared/ui/elements'

import type { PostData } from '../feed.types'
import { feedState } from '../feed-state'

import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  uuid: PostData['uuid']
  offset: number
  hidden?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement

  const getText = createMemo(() =>
    feedState.posts[props.uuid].message
  )

  const getChannel = createMemo(() => {
    const channelId = feedState.posts[props.uuid].peer_id.channel_id
    const channel = feedState.channels[channelId]
    return {
      title: channel.title,
      cover: channel.photo
    }
  })

  onMount(() => {
    props.onMount?.(el)
  })

  onCleanup(() => {
    props.onCleanup?.(el)
  })

  return (
    <div
      class={feedPostsItemCSS.wrapper}
      style={{
        top: `${props.offset}px`,
        opacity: typeof props.offset === 'undefined' ? 0 : 1,
        display: props.hidden ? 'none' : 'block'
      }}
      id={props.uuid}
      // eslint-disable-next-line solid/reactivity
      ref={el}
    >
      <div class={feedPostsItemCSS.base}>
        <Text variant='body' size='medium'>
          {getText()}
        </Text>
      </div>
    </div>
  )
}
