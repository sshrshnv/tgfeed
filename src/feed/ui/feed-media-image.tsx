import type { Component } from 'solid-js'
import { createSignal, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { MessageMedia } from '~/shared/api/mtproto'
import { Image, BluredImage } from '~/shared/ui/elements/image'

import type { PostUuid } from '../feed.types'
import { getPostImageUrls, pausePostImageLoading } from '../utils/get-post-image-urls'
import { FeedMediaControls } from './feed-media-controls'

import * as feedMediaImageCSS from './feed-media-image.sss'

export type FeedMediaItemProps = {
  uuid: PostUuid
  media: MessageMedia.messageMediaPhoto | MessageMedia.messageMediaDocument
  visible?: boolean
}

type LoadingCache = {
  [uuid: PostUuid]: {
    started: boolean
    ended: boolean
  }
}

const [loadingCache, setLoadingCache] = createStore<LoadingCache>({})

export const FeedMediaImage: Component<FeedMediaItemProps> = (props) => {
  const [isLoading, setLoading] = createSignal(false)

  const getImageUrls = () => {
    if (!isLoadStarted()) {
      setLoadingCache(props.uuid, { started: true })
      setLoading(true)
    }
    return getPostImageUrls(props.uuid, props.media)
  }

  const pauseLoading = () => {
    if (!isLoadStarted() || isLoadEnded()) return
    setLoadingCache(props.uuid, { started: false })
    pausePostImageLoading(props.media)
  }

  const handleLoad = () => {
    setLoadingCache(props.uuid, { ended: true })
    setLoading(false)
  }

  const isLoadStarted = () => (
    loadingCache[props.uuid]?.started
  )

  const isLoadEnded = () => (
    loadingCache[props.uuid]?.ended
  )

  createEffect((prevVisible) => {
    if (prevVisible && !props.visible) {
      pauseLoading?.()
    }
    return props.visible
  })

  return (
    <div class={feedMediaImageCSS.base}>
      <BluredImage
        src={props.visible || isLoadStarted() ? getImageUrls().thumbUrl : ''}
        width={100}
        height={100}
        radius={24}
      />
      <Image
        src={props.visible || isLoadStarted() ? getImageUrls().imageUrl : ''}
        alt=''
        onLoad={handleLoad}
      />
      <FeedMediaControls
        loading={isLoading()}
      />
    </div>
  )
}
