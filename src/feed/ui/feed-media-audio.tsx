/* eslint-disable jsx-a11y/media-has-caption */
import type { Component } from 'solid-js'

import type { MessageMedia } from '~/shared/api/mtproto'

import type { PostUuid } from '../feed.types'

import * as feedMediaAudioCSS from './feed-media-audio.sss'

export type FeedMadiaAudioProps = {
  uuid: PostUuid
  media: MessageMedia.messageMediaDocument
  visible?: boolean
}

export const FeedMediaAudio: Component<FeedMadiaAudioProps> = (props) => {
  return (
    <div class={feedMediaAudioCSS.base}>
      <audio
        src={''}
        preload='auto'
      />
    </div>
  )
}
