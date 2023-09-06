/* eslint-disable jsx-a11y/media-has-caption */
import type { Component } from 'solid-js'
import { createSignal, createEffect, untrack } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { MessageMedia } from '~/shared/api/mtproto'
import { BluredImage } from '~/shared/ui/elements/image'

import type { PostUuid } from '../feed.types'
import { getMediaVideoSize } from '../utils/detect-post-media'
import { getPostImageUrls } from '../utils/get-post-image-urls'
import { getPostStreamUrl } from '../utils/get-post-stream-url'
import { FeedMediaControls } from './feed-media-controls'

import * as feedMediaVideoCSS from './feed-media-video.sss'

export type FeedMadiaVideoProps = {
  uuid: PostUuid
  media: MessageMedia.messageMediaDocument
  playing: boolean
  visible?: boolean
  onEnded: () => void
}

type LoadingCache = {
  [uuid: PostUuid]: {
    started: boolean
  }
}

const [loadingCache, setLoadingCache] = createStore<LoadingCache>({})

export const FeedMediaVideo: Component<FeedMadiaVideoProps> = (props) => {
  let videoEl!: HTMLVideoElement
  const [isLoading, setLoading] = createSignal(false)

  const getImageUrls = () => {
    if (!isLoadStarted()) {
      setLoadingCache(props.uuid, { started: true })
      setLoading(true)
    }
    return getPostImageUrls(props.uuid, props.media)
  }

  const getVideoUrl = () => {
    return getPostStreamUrl(props.uuid, props.media)
  }

  const getVideoSize = () => {
    return getMediaVideoSize(props.media)
  }

  const isLoadStarted = () => (
    loadingCache[props.uuid]?.started
  )

  const handleCanPlay = () => {
    setLoading(false)
  }

  const handleWaiting = () => {
    setLoading(true)
  }

  const handleEnded = () => {
    props.onEnded()
  }

  createEffect((prev) => {
    if (!videoEl) return
    if (prev && !props.playing) {
      videoEl.pause()
    }
    if (!prev && props.playing && !untrack(isLoading)) {
      videoEl.play()
    }
    return props.playing
  })

  return (
    <div class={feedMediaVideoCSS.base}>
      <BluredImage
        src={props.visible || isLoadStarted() ? getImageUrls().thumbUrl : ''}
        width={100}
        height={100}
        radius={24}
      />
      <video
        ref={videoEl}
        src={props.visible || isLoadStarted() ? getVideoUrl() : ''}
        width={getVideoSize()?.w}
        height={getVideoSize()?.h}
        poster={props.visible || isLoadStarted() ? getImageUrls().imageUrl : ''}
        onCanPlayThrough={handleCanPlay}
        onWaiting={handleWaiting}
        onEnded={handleEnded}
        preload='auto'
        controls={false}
        playsinline
      />
      <FeedMediaControls
        icon={props.playing ? 'pause' : 'play'}
        loading={isLoading()}
      />
    </div>
  )
}
