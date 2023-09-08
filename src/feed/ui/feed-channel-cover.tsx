import type { Component } from 'solid-js'
import { Show, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Image, BluredImage } from '~/shared/ui/elements/image'

import type { ChannelId } from '../feed.types'
import { feedCache } from '../feed-cache'
import { getChannelCoverUrls } from '../utils/get-channel-cover-urls'

import * as feedChannelCoverCSS from './feed-channel-cover.sss'

export type FeedChannelCoverProps = {
  class?: string
  channelId: ChannelId
  size: 'small' | 'medium'
  visible?: boolean
}

const SIZES = {
  small: 24,
  medium: 32
}

const loadingCache: Record<string, boolean> = {}

export const FeedChannelCover: Component<FeedChannelCoverProps> = (props) => {
  const hasCover = createMemo(() => {
    return feedCache.channels[props.channelId].photo._ === 'chatPhoto'
  })

  const getCoverUrls = () => {
    if (!isLoadStarted()) {
      loadingCache[props.channelId] = true
    }

    return getChannelCoverUrls(
      feedCache.channels[props.channelId]
    )
  }

  const isLoadStarted = () => (
    loadingCache[props.channelId]
  )

  return (
    <div class={clsx(
      props.class,
      feedChannelCoverCSS[`_${props.size}`],
      feedChannelCoverCSS.base
    )}>
      <Show when={hasCover()}>
        <BluredImage
          src={props.visible || isLoadStarted() ? getCoverUrls().thumbUrl : ''}
          width={SIZES[props.size]}
          height={SIZES[props.size]}
          radius={SIZES[props.size] / 2}
          unnecessary
        />
        <Image
          src={props.visible || isLoadStarted() ? getCoverUrls().coverUrl : ''}
          alt=''
        />
      </Show>
    </div>
  )
}
