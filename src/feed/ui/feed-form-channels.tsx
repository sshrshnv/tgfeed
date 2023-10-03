import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { FeedFormChannelsItem } from './feed-form-channels-item'

export type FeedFormChannelsProps = {
  folder?: Folder
  parentEl: Element
  onChange: () => void
}

export const FeedFormChannels: Component<FeedFormChannelsProps> = (props) => {
  const useVisibilityObserver = createVisibilityObserver({
    root: props.parentEl
  })

  return (
    <For each={feedState.channelIds}>{channelId => {
      let el!: HTMLLabelElement
      const isVisible = useVisibilityObserver(() => el)

      return (
        <FeedFormChannelsItem
          channelId={channelId}
          name='channelIds[]'
          ref={el}
          visible={isVisible()}
          checked={props.folder?.channelIds.includes(channelId)}
          onChange={props.onChange}
        />
      )
    }}</For>
  )
}
