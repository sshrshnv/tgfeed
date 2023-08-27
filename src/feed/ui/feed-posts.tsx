import type { Component } from 'solid-js'
import { Show, For, createEffect, onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils'
import { Icon } from '~/shared/ui/elements'

import type { PostUuid, PostGroupUuid } from '../feed.types'
import { feedState } from '../feed-state'
import { isPostGroupUuid } from '../utils'
import { FeedPostsItem } from './feed-posts-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedPostsCSS from './feed-posts.sss'

export type FeedPostsProps = {
  postUuids: (PostUuid | PostGroupUuid)[]
  loading?: boolean
}

type HeightState = {
  [uuid in PostUuid]: number
}

type OffsetState = {
  [uuid in PostUuid]: number
}

export const FeedPosts: Component<FeedPostsProps> = (props) => {
  const SCROLL_EL_ID = 'scrollEl'
  let scrollEl!: HTMLDivElement

  const [resizeObserverEls, setResizeObserverEls] = createStore<(Element | undefined)[]>([])
  const [heightState, setHeightState] = createStore<HeightState>({})
  const [offsetState, setOffsetState] = createStore<OffsetState>({})
  const [getScroll, setScroll] = createSignal(0)

  const handleScroll = () => {
    self.requestAnimationFrame(() => {
      setScroll(Math.floor(scrollEl.scrollTop / 100) * 100)
    })
  }

  const addResizeObserverEl = (el: Element) => {
    setResizeObserverEls(resizeObserverEls.length, el)
  }

  const removeResizeObserverEl = (el: Element) => {
    setResizeObserverEls(
      resizeObserverEls.findIndex(resizeObserverEl => resizeObserverEl === el),
      undefined
    )
  }

  createResizeObserver(resizeObserverEls, ({ height }, el) => {
    self.requestAnimationFrame(() => {
      if (!height) return
      setHeightState(el.id as PostUuid, height)
    })
  })

  createEffect((prevFolderId) => {
    if (prevFolderId !== feedState.currentFolderId) {
      scrollEl.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
    return feedState.currentFolderId
  })

  onMount(() => {
    addResizeObserverEl(scrollEl)
    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
  })

  onCleanup(() => {
    removeResizeObserverEl(scrollEl)
    scrollEl.removeEventListener('scroll', handleScroll)
  })

  return (
    <div
      class={clsx(
        feedPostsCSS.base,
        layoutCSS.flex,
        layoutCSS.scroll,
        layoutCSS.scrollCustom,
        isIOS() && animationsCSS.forcedPerformance
      )}
      id={SCROLL_EL_ID}
      ref={scrollEl}
    >
      <For each={props.postUuids}>{(unsafeUuid, getIndex) => {
        const getPostUuid = createMemo(() => (
          isPostGroupUuid(unsafeUuid) ? feedState.postGroups[unsafeUuid][0] : unsafeUuid as PostUuid
        ))

        const getPostGroupUuid = createMemo(() => (
          getPostUuid() === unsafeUuid ? undefined : unsafeUuid
        ))

        const getPrevPostUuid = createMemo(() => {
          const prevUuid = props.postUuids[getIndex() - 1]
          return (prevUuid && isPostGroupUuid(prevUuid)) ? feedState.postGroups[prevUuid][0] : prevUuid
        })

        const isVisible = createMemo(() => {
          const uuid = getPostUuid()
          return !(
            !!offsetState[uuid] &&
            !!heightState[uuid] && (
              (offsetState[uuid] + heightState[uuid] <= getScroll() - heightState[SCROLL_EL_ID]) ||
              (offsetState[uuid] >= getScroll() + heightState[SCROLL_EL_ID] * 2)
            )
          )
        })

        createEffect(() => {
          const uuid = getPostUuid()
          const prevUuid = getPrevPostUuid()
          const prevOffset = prevUuid && offsetState[prevUuid] || 0
          const prevHeight = prevUuid && heightState[prevUuid] || 0
          if (getIndex() && !prevHeight) return
          setOffsetState(uuid, prevOffset + prevHeight + 16)
        })

        return (
          <FeedPostsItem
            uuid={getPostUuid()}
            groupUuid={getPostGroupUuid()}
            index={getIndex()}
            offset={offsetState[getPostUuid()]}
            visible={isVisible()}
            onMount={addResizeObserverEl}
            onCleanup={removeResizeObserverEl}
          />
        )
      }}</For>

      <Show when={props.loading}>
        <Icon
          class={clsx(
            feedPostsCSS.loader,
            animationsCSS.rotate
          )}
          name='loader'
          size='large'
        />
      </Show>
    </div>
  )
}
