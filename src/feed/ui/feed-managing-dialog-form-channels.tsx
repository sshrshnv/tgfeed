import type { Component } from 'solid-js'
import { For, createMemo } from 'solid-js'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { FeedManagingDialogFormChannelsItem } from './feed-managing-dialog-form-channels-item'

export type FeedManagingDialogFormChannelsProps = {
  folder?: Folder
  parentEl: Element
  onChange: () => void
}

export const FeedManagingDialogFormChannels: Component<FeedManagingDialogFormChannelsProps> = (props) => {
  const useVisibilityObserver = createVisibilityObserver({
    root: props.parentEl
  })

  const getChannelIds = createMemo(() => {
    return Object.keys(feedState.channels)
  })

  return (
    <For each={getChannelIds()}>{channelId => {
      let el!: HTMLLabelElement
      const isVisible = useVisibilityObserver(() => el)

      return (
        <FeedManagingDialogFormChannelsItem
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
