/* eslint-disable jsx-a11y/media-has-caption */
import type { Component } from 'solid-js'
import { Show, createSignal, createEffect, untrack, batch } from 'solid-js'
import { createStore } from 'solid-js/store'
import { clsx } from 'clsx'

import type { MessageMedia } from '~/shared/api/mtproto'
import { BluredImage } from '~/shared/ui/elements/image'
import { Icon } from '~/shared/ui/elements/icon'

import type { PostUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { isMediaVideo, isMediaAudio, hasThumbs, getMediaVideoSize } from '../utils/detect-post-media'
import { getPostImageUrls } from '../utils/get-post-image-urls'
import { getPostStreamUrl } from '../utils/get-post-stream-url'
import { FeedMediaControls } from './feed-media-controls'

import * as feedMediaPlayerCSS from './feed-media-player.sss'

export type FeedMediaPlayerProps = {
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

export const FeedMadiaPlayer: Component<FeedMediaPlayerProps> = (props) => {
  let playerEl!: HTMLVideoElement | HTMLAudioElement
  let posterEl!: HTMLCanvasElement

  const [isLoading, setLoading] = createSignal(false)
  const [isPaused, setPaused] = createSignal(false)

  const getImageUrls = () => {
    if (!isLoadStarted()) {
      setLoadingCache(props.uuid, { started: true })
    }
    return getPostImageUrls(props.uuid, props.media)
  }

  const getStreamUrl = () =>
    getPostStreamUrl(props.uuid, props.media)

  const getVideoSize = () =>
    getMediaVideoSize(props.media)

  const isRoundVideo = () =>
    getVideoSize()?.round_message

  const isLoadStarted = () =>
    loadingCache[props.uuid]?.started

  const isImageReady = () =>
    props.visible || isLoadStarted()

  const isPlayerReady = () =>
    feedState.streamsHandlerActivated && isImageReady()

  const handleCanPlay = () =>
    setLoading(false)

  const handleWaiting = () =>
    setLoading(true)

  const handleEnded = () =>
    props.onEnded()

  createEffect((prev) => {
    if (!playerEl) return
    const loading = untrack(isLoading)
    const paused = untrack(isPaused)

    if (prev && !props.playing) {
      playerEl.pause()
      batch(() => {
        if (!paused) setPaused(true)
        if (loading) setLoading(false)
      })
    }

    if (!prev && props.playing && !loading) {
      if (paused) setPaused(false)
      playerEl.play().catch(() => {})
    }

    return props.playing
  })

  createEffect((prev) => {
    const paused = isPaused()
    const size = getVideoSize()

    if (!prev && paused && !!posterEl && !!size) {
      const ctx = posterEl.getContext('2d', { alpha: true })
      ctx?.drawImage(playerEl as HTMLVideoElement, 0, 0, size.w, size.h)
    }

    return paused
  })

  return (
    <div class={feedMediaPlayerCSS.base}>
      <Show when={hasThumbs(props.media)}>
        <BluredImage
          class={clsx(
            feedMediaPlayerCSS.thumb,
            isRoundVideo() && feedMediaPlayerCSS._large
          )}
          src={isImageReady() ? getImageUrls().thumbUrl : ''}
          width={100}
          height={100}
          radius={24}
        />
      </Show>

      <Show when={isMediaVideo(props.media)}>
        <div class={clsx(
          feedMediaPlayerCSS.wrapper,
          isRoundVideo() && feedMediaPlayerCSS._round
        )}>
          <video
            class={clsx(
              feedMediaPlayerCSS.video,
              isPaused() && feedMediaPlayerCSS._hidden
            )}
            ref={playerEl as HTMLVideoElement}
            src={isPlayerReady() ? getStreamUrl() : ''}
            width={getVideoSize()?.w}
            height={getVideoSize()?.h}
            poster={isImageReady() ? getImageUrls().imageUrl : ''}
            onCanPlayThrough={handleCanPlay}
            onWaiting={handleWaiting}
            onEnded={handleEnded}
            autoplay={false}
            controls={false}
            preload='none'
            playsinline
          />

          <canvas
            class={clsx(
              feedMediaPlayerCSS.poster,
              !isPaused() && feedMediaPlayerCSS._hidden
            )}
            ref={posterEl}
            width={getVideoSize()?.w}
            height={getVideoSize()?.h}
          />
        </div>
      </Show>

      <Show when={isMediaAudio(props.media)}>
        <>
          <Icon
            class={feedMediaPlayerCSS.sound}
            name='sound'
          />

          <audio
            ref={playerEl as HTMLAudioElement}
            src={isPlayerReady() ? getStreamUrl() : ''}
            onCanPlayThrough={handleCanPlay}
            onWaiting={handleWaiting}
            onEnded={handleEnded}
            autoplay={false}
            controls={false}
            preload='none'
          />
        </>
      </Show>

      <FeedMediaControls
        icon={isPlayerReady() && !props.playing ? 'play' : undefined}
        loading={isLoading()}
        center={!isMediaAudio(props.media)}
      />
    </div>
  )
}
