import type { Component } from 'solid-js'
import { Show, createMemo, onMount, onCleanup } from 'solid-js'
import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils'
import { Paragraph } from '~/shared/ui/elements'

import type { PostUuid, PostGroupUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { formatPostText, isSupportedMedia } from '../utils'
import { FeedPostsItemHeader } from './feed-posts-item-header'
import { FeedPostsItemMedia } from './feed-posts-item-media'

import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedPostsItemCSS from './feed-posts-item.sss'

export type FeedPostsItemProps = {
  index: number
  uuid: PostUuid
  groupUuid?: PostGroupUuid
  offset: number
  visible?: boolean
  onMount?: (el: Element) => void
  onCleanup?: (el: Element) => void
}

export const FeedPostsItem: Component<FeedPostsItemProps> = (props) => {
  let el!: HTMLDivElement

  const getPost = createMemo(() =>
    feedState.posts[props.uuid] || {}
  )

  const getText = createMemo(() =>
    formatPostText(getPost().message, getPost().entities)
  )

  const hasText = createMemo(() =>
    !!getText().length
  )

  const hasMedia = createMemo(() =>
    !!props.groupUuid || isSupportedMedia(getPost().media)
  )

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
        isIOS() && animationsCSS.forcedPerformance
      )}
      style={{
        top: `${props.offset}px`,
        opacity: typeof props.offset === 'undefined' ? 0 : 1,
        display: props.visible ? 'block' : 'none'
      }}
      id={props.uuid}
      ref={el}
    >
      <article class={feedPostsItemCSS.base}>
        <FeedPostsItemHeader
          class={feedPostsItemCSS.header}
          uuid={props.uuid}
          visible={props.visible}
        />

        <Show when={hasMedia()}>
          <FeedPostsItemMedia
            uuid={props.uuid}
            groupUuid={props.groupUuid}
            visible={props.visible}
          />
        </Show>

        <Show when={hasText()}>
          <Paragraph
            class={feedPostsItemCSS.text}
            size='medium'
            // eslint-disable-next-line solid/no-innerhtml
            innerHTML={getText()}
          />
        </Show>
      </article>
    </div>
  )
}
