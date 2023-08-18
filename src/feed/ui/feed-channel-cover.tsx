import type { Component } from 'solid-js'
import { Show, createMemo } from 'solid-js'
import { unwrap } from 'solid-js/store'
import { clsx } from 'clsx'

import { Image, BluredImage } from '~/shared/ui/elements'

import type { ChannelData } from '../feed.types'
import { feedState } from '../feed-state'
import { getChannelCover } from '../utils'

import * as feedChannelCoverCSS from './feed-channel-cover.sss'

export type FeedChannelCoverProps = {
  class?: string
  channelId: ChannelData['id']
  size: 'small' | 'medium'
  visible?: boolean
}

const SIZES = {
  small: 24,
  medium: 32
}

export const FeedChannelCover: Component<FeedChannelCoverProps> = (props) => {
  const hasCover = createMemo(() => {
    return feedState.channels[props.channelId].photo._ === 'chatPhoto'
  })

  const getCover = createMemo(() => {
    return getChannelCover(
      unwrap(feedState.channels[props.channelId]),
      { visible: props.visible }
    )
  })

  return (
    <div class={clsx(
      props.class,
      feedChannelCoverCSS[`_${props.size}`],
      feedChannelCoverCSS.base
    )}>
      <Show when={hasCover() && (getCover()?.coverUrl || props.visible)}>
        <Image
          src={getCover()?.coverUrl || ''}
          alt=''
          fadeIn
        />
        <BluredImage
          src={getCover()?.thumbUrl || ''}
          width={SIZES[props.size]}
          height={SIZES[props.size]}
          radius={SIZES[props.size] / 2}
        />
      </Show>
    </div>
  )
}
