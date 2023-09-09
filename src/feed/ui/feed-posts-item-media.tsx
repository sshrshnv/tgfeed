import type { Component } from 'solid-js'
import { Switch, Match, For, createMemo, createSignal, createEffect, batch, untrack } from 'solid-js'

import type { MessageMedia } from '~/shared/api/mtproto'
import { Slider } from '~/shared/ui/elements/slider'

import type { PostUuid, PostGroupUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { feedCache } from '../feed-cache'
import { getMediaAspectRatio, isMediaImage, isMediaVideo, isMediaAudio } from '../utils/detect-post-media'
import { FeedMediaImage } from './feed-media-image'
import { FeedMediaVideo } from './feed-media-video'
import { FeedMediaAudio } from './feed-media-audio'

import * as feedPostsItemMedia from './feed-posts-item-media.sss'

export type FeedPostsItemMediaProps = {
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  visible?: boolean
  onScreen?: boolean
}

type MediaItem = {
  uuid: PostUuid
  media: MessageMedia.messageMediaPhoto | MessageMedia.messageMediaDocument
  playable: boolean
}

export const FeedPostsItemMedia: Component<FeedPostsItemMediaProps> = (props) => {
  const [getActiveIndex, setActiveIndex] = createSignal(0)
  const [isPlaying, setPlaying] = createSignal(false)

  const getItems = createMemo(() => (props.groupUuid ?
    feedState.postGroups[props.groupUuid].map(uuid => ({
      uuid,
      media: feedCache.posts[uuid].media,
      playable: !isMediaImage(feedCache.posts[uuid].media!)
    })):
    [{
      uuid: props.uuid,
      media: feedCache.posts[props.uuid].media,
      playable: !isMediaImage(feedCache.posts[props.uuid].media!)
    }]
  ) as MediaItem[])

  const getAspectRatio = () =>
    Math.min(...getItems().map(item => getMediaAspectRatio(item.media)))

  const handleActiveIndexChange = (k: number) => {
    batch(() => {
      isPlaying() && setPlaying(false)
      setActiveIndex(index => Math.max(0, Math.min(getItems().length - 1, index + k)))
    })
  }

  const handleClick = () => {
    if (!getItems()[getActiveIndex()].playable) return
    setPlaying(value => !value)
  }

  const handleEnded = () => {
    setPlaying(false)
  }

  createEffect((prev) => {
    if (prev && !props.onScreen && untrack(isPlaying)) {
      setPlaying(false)
    }
    return props.onScreen
  })

  return (
    <Slider
      class={feedPostsItemMedia.base}
      activeIndex={getActiveIndex()}
      aspectRatio={getAspectRatio()}
      onChange={handleActiveIndexChange}
      onClick={handleClick}
    >
      <For each={getItems()}>{(item, getIndex) => {
        const isItemVisible = () => (
          props.visible &&
          (getIndex() >= getActiveIndex() - 1) &&
          (getIndex() <= getActiveIndex() + 1)
        )

        const isItemPlaying = () => (
          isPlaying() && getIndex() === getActiveIndex()
        )

        return (
          <Switch>
            <Match when={isMediaImage(item.media)}>
              <FeedMediaImage
                uuid={item.uuid}
                media={item.media}
                visible={isItemVisible()}
              />
            </Match>

            <Match when={isMediaVideo(item.media)}>
              <FeedMediaVideo
                uuid={item.uuid}
                media={item.media as MessageMedia.messageMediaDocument}
                playing={isItemPlaying()}
                visible={isItemVisible()}
                onEnded={handleEnded}
              />
            </Match>

            <Match when={isMediaAudio(item.media)}>
              <FeedMediaAudio
                uuid={item.uuid}
                media={item.media as MessageMedia.messageMediaDocument}
                playing={isItemPlaying()}
                visible={isItemVisible()}
                onEnded={handleEnded}
              />
            </Match>
          </Switch>
        )
      }}</For>
    </Slider>
  )
}
