import type { Component } from 'solid-js'
import { Show, createSignal, createEffect, createMemo, onMount, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import type { UncertainPostUuid, PostUuid, PostGroupUuid } from '../feed.types'
import { feedCache } from '../feed-cache'
import { isSupportedMedia } from '../utils/detect-post-media'
import { FeedPostsItemHeader } from './feed-posts-item-header'
import { FeedPostsItemMedia } from './feed-posts-item-media'
import { FeedPostsItemText } from './feed-posts-item-text'

import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  refId: UncertainPostUuid
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  offset: number
  datePadding?: boolean
  visible?: boolean
  onScreen?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement
  const [isReady, setReady] = createSignal(false)

  const getPost = () =>
    feedCache.posts[props.uuid]

  const getStyles = createMemo(() => ({
    translate: `0 ${props.offset}px`
  }))

  const hasText = () =>
    !!getPost().message.length

  const hasMedia = () =>
    !!props.groupUuid || isSupportedMedia(getPost().media)

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
        !props.visible && feedPostsItemCSS._hidden,
        !isReady() && feedPostsItemCSS._transparent
      )}
      style={getStyles()}
      id={props.refId}
      ref={el}
    >
      <Show when={props.datePadding}>
        <div class={clsx(
          feedPostsItemCSS.padding,
          props.datePadding && feedPostsItemCSS._date
        )}/>
      </Show>

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
