import type { Component } from 'solid-js'
import { createMemo, onMount } from 'solid-js'

import type { PostData } from '../feed.types'
import { feedState } from '../feed-state'

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
      ref={postEl}
    >
      {getText()}
    </div>
  )
}
