import type { Component } from 'solid-js'
import { Show, createMemo } from 'solid-js'
import { unwrap } from 'solid-js/store'
import { clsx } from 'clsx'

import { Input, Image, BluredImage, Text } from '~/shared/ui/elements'

import type { ChannelData } from '../feed.types'
import { feedState } from '../feed-state'
import { getChannelCover } from '../utils'

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

  const getCover = createMemo(() => {
    return getChannelCover(
      unwrap(feedState.channels[props.channelId]),
      { visible: props.visible }
    )
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
      <div class={feedManagingDialogFormChannelsItemCSS.cover}>
        <Show when={
          (getCover()?.coverUrl || props.visible) &&
          getChannel().photo._ === 'chatPhoto'
        }>
          <Image
            src={getCover()?.coverUrl || ''}
            alt=''
            fadeIn
          />
          <BluredImage
            src={getCover()?.thumbUrl || ''}
            width={36}
            height={36}
            radius={18}
          />
        </Show>
      </div>
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
