import type { Component } from 'solid-js'
import { Show, createMemo, createSignal, createEffect, onMount, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import type { PostUuid, PostGroupUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { isSupportedMedia } from '../utils/detect-post-media'
import { FeedPostsItemHeader } from './feed-posts-item-header'
import { FeedPostsItemMedia } from './feed-posts-item-media'
import { FeedPostsItemText } from './feed-posts-item-text'

import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  offset: number
  visible?: boolean
  onScreen?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement
  const [isReady, setReady] = createSignal(false)

  const getPost = createMemo(() =>
    feedState.posts[props.uuid]
  )

  const hasText = createMemo(() =>
    !!getPost().message.length
  )

  const hasMedia = createMemo(() =>
    !!props.groupUuid || isSupportedMedia(getPost().media)
  )

  createEffect((prevOffset) => {
    if (typeof prevOffset !== 'undefined') return
    self.setTimeout(() => {
      setReady(true)
    }, 50)
    return props.offset
  })

  onMount(() => {
    props.onMount?.(el)
  })

  onCleanup(() => {
    props.onCleanup?.(el)
  })

  return (
    <div
      class={clsx(
        feedPostsItemCSS.wrapper,
        !isReady() && feedPostsItemCSS._transparent
      )}
      style={{
        translate: `0px ${props.offset}px`,
        display: props.visible ? 'block' : 'none'
      }}
      id={props.uuid}
      ref={el}
    >
      <article class={feedPostsItemCSS.base}>
        <FeedPostsItemHeader
          uuid={props.uuid}
          visible={props.visible && isReady()}
        />

        <Show when={hasMedia()}>
          <FeedPostsItemMedia
            uuid={props.uuid}
            groupUuid={props.groupUuid}
            visible={props.visible && isReady()}
            onScreen={props.onScreen && isReady()}
          />
        </Show>

        <Show when={hasText()}>
          <FeedPostsItemText
            uuid={props.uuid}
            visible={props.visible}
          />
        </Show>
      </article>
    </div>
  )
}
