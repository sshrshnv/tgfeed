import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Input, Text } from '~/shared/ui/elements'

import type { ChannelData } from '../feed.types'
import { feedState } from '../feed-state'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedManagingDialogFormChannelsItemCSS from './feed-managing-dialog-form-channels-item.sss'

export type FeedManagingDialogFormChannelProps = {
  channelId: ChannelData['id']
  name: string
  ref: HTMLLabelElement
  visible: boolean
  checked?: boolean
  onChange: () => void
}

export const FeedManagingDialogFormChannelsItem: Component<FeedManagingDialogFormChannelProps> = (props) => {
  const getChannel = createMemo(() => {
    return feedState.channels[props.channelId]
  })

  return (
    <label
      class={clsx(
        feedManagingDialogFormChannelsItemCSS.base,
        layoutCSS.flex
      )}
      ref={props.ref}
    >
      <Input
        class={feedManagingDialogFormChannelsItemCSS.input}
        type='checkbox'
        name={props.name}
        value={props.channelId}
        checked={props.checked}
        onChange={props.onChange}
        transparent
      />
      <div class={feedManagingDialogFormChannelsItemCSS.check}/>
      <FeedChannelCover
        channelId={props.channelId}
        size='medium'
        visible={props.visible}
      />
      <Text
        class={feedManagingDialogFormChannelsItemCSS.title}
        variant='label'
        size='large'
        ellipsis
      >
        {getChannel().title}
      </Text>
    </label>
  )
}
