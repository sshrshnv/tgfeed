import type { Component } from 'solid-js'
import { Switch, Match, For, createMemo, createSignal } from 'solid-js'

import type { MessageMedia } from '~/shared/api/mtproto'
import { Slider } from '~/shared/ui/elements'

import type { PostUuid, PostGroupUuid } from '../feed.types'
import { feedState } from '../feed-state'
import {
  getMediaAspectRatio,
  isMediaImage,
  isMediaVideo,
  isMediaAudio
} from '../utils'
import { FeedMediaImage } from './feed-media-image'
import { FeedMediaVideo } from './feed-media-video'
import { FeedMediaAudio } from './feed-media-audio'

import * as feedPostsItemMedia from './feed-posts-item-media.sss'

export type FeedPostsItemMediaProps = {
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  visible?: boolean
}

type MediaItem = {
  uuid: PostUuid
  media: MessageMedia.messageMediaPhoto | MessageMedia.messageMediaDocument
}

export const FeedPostsItemMedia: Component<FeedPostsItemMediaProps> = (props) => {
  const [getActiveIndex, setActiveIndex] = createSignal(0)

  const getItems = createMemo(() => (props.groupUuid ?
    feedState.postGroups[props.groupUuid].map(uuid => ({
      uuid,
      media: feedState.posts[uuid].media
    })):
    [{
      uuid: props.uuid,
      media: feedState.posts[props.uuid].media
    }]
  ) as MediaItem[])

  const getAspectRatio = createMemo(() =>
    Math.min(...getItems().map(item => getMediaAspectRatio(item.media)))
  )

  const handleActiveIndexChange = (k: number) => {
    setActiveIndex(index => Math.max(0, Math.min(getItems().length - 1, index + k)))
  }

  return (
    <Slider
      class={feedPostsItemMedia.base}
      activeIndex={getActiveIndex()}
      aspectRatio={getAspectRatio()}
      onChange={handleActiveIndexChange}
    >
      <For each={getItems()}>{(item, getIndex) => {
        const isVisible = createMemo(() => (
          props.visible &&
          (getIndex() >= getActiveIndex() - 1) &&
          (getIndex() <= getActiveIndex() + 1)
        ))

        return (
          <Switch>
            <Match when={isMediaImage(item.media)}>
              <FeedMediaImage
                uuid={item.uuid}
                media={item.media}
                visible={isVisible()}
              />
            </Match>

            <Match when={isMediaVideo(item.media)}>
              <FeedMediaVideo
                uuid={item.uuid}
                media={item.media as MessageMedia.messageMediaDocument}
                visible={isVisible()}
              />
            </Match>

            <Match when={isMediaAudio(item.media)}>
              <FeedMediaAudio
                uuid={item.uuid}
                media={item.media as MessageMedia.messageMediaDocument}
                visible={isVisible()}
              />
            </Match>
          </Switch>
        )
      }}</For>
    </Slider>
  )
}
