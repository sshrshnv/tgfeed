import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Input } from '~/shared/ui/elements/input'
import { Text } from '~/shared/ui/elements/text'

import type { ChannelId } from '../feed.types'
import { feedCache } from '../feed-cache'
import { FeedChannelCover } from './feed-channel-cover'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedFormChannelsItemCSS from './feed-form-channels-item.sss'

export type FeedFormChannelProps = {
  channelId: ChannelId
  name: string
  ref: HTMLLabelElement
  visible: boolean
  checked?: boolean
  onChange: () => void
}

export const FeedFormChannelsItem: Component<FeedFormChannelProps> = (props) => {
  const getChannel = () => {
    return feedCache.channels[props.channelId]
  }

  return (
    <label
      class={clsx(
        feedFormChannelsItemCSS.base,
        layoutCSS.flex
      )}
      ref={props.ref}
    >
      <Input
        class={feedFormChannelsItemCSS.input}
        type='checkbox'
        name={props.name}
        value={props.channelId}
        checked={props.checked}
        onChange={props.onChange}
        transparent
      />
      <div class={feedFormChannelsItemCSS.check}/>
      <FeedChannelCover
        channelId={props.channelId}
        size='medium'
        visible={props.visible}
      />
      <Text
        class={feedFormChannelsItemCSS.title}
        variant='label'
        size='large'
        ellipsis
      >
        {getChannel().title}
      </Text>
    </label>
  )
}
