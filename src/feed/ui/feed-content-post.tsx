import type { Component } from 'solid-js'
import { createMemo, onMount } from 'solid-js'

import { Text } from '~/shared/ui/elements'

import type { PostData } from '../feed.types'
import { feedState } from '../feed-state'

import * as feedContentPostCSS from './feed-content-post.sss'

export type FeedContentPostProps = {
  index: number
  uuid: PostData['uuid']
  onMount?: (el: Element) => void
}

export const FeedContentPost: Component<FeedContentPostProps> = (props) => {
  let postEl!: HTMLDivElement

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
    props.onMount?.(postEl)
  })

  return (
    <div
      class={feedContentPostCSS.wrapper}
      ref={postEl}
    >
      <div class={feedContentPostCSS.base}>
        <Text variant='body' size='medium'>
          {getText()}
        </Text>
      </div>
    </div>
  )
}
