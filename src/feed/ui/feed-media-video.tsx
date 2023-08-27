/* eslint-disable jsx-a11y/media-has-caption */
import type { Component } from 'solid-js'

import type { MessageMedia } from '~/shared/api/mtproto'
import { BluredImage } from '~/shared/ui/elements'

import type { PostUuid } from '../feed.types'
import { getPostImageUrls, getMediaVideoSize } from '../utils'

import * as feedMediaVideoCSS from './feed-media-video.sss'

export type FeedMadiaVideoProps = {
  uuid: PostUuid
  media: MessageMedia.messageMediaDocument
  visible?: boolean
}

export const FeedMediaVideo: Component<FeedMadiaVideoProps> = (props) => {
  const getImageUrls = () => {
    return getPostImageUrls(props.uuid, props.media)
  }

  const getVideoSize = () => {
    return getMediaVideoSize(props.media)
  }

  return (
    <div class={feedMediaVideoCSS.base}>
      <BluredImage
        src={props.visible ? getImageUrls().thumbUrl : ''}
        width={100}
        height={100}
        radius={24}
      />
      <video
        src={''}
        width={getVideoSize()?.w}
        height={getVideoSize()?.h}
        poster={props.visible ? getImageUrls().imageUrl : ''}
        preload='auto'
        playsinline
      />
    </div>
  )
}
