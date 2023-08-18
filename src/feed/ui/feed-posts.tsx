import type { Component } from 'solid-js'
import { Show, For, createEffect, onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements'

import type { PostData } from '../feed.types'
import { feedState } from '../feed-state'
import { FeedPostsItem } from './feed-posts-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedPostsCSS from './feed-posts.sss'

export type FeedPostsProps = {
  postUuids: PostData['uuid'][]
  loading?: boolean
}

type HeightState = {
  [uuid in PostData['uuid']]: number
}

type OffsetState = {
  [uuid in PostData['uuid']]: number
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
      setHeightState(el.id as PostData['uuid'], height)
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
        layoutCSS.scrollCustom
      )}
      id={SCROLL_EL_ID}
      ref={scrollEl}
    >
      <For each={props.postUuids}>{(uuid, getIndex) => {
        const isHidden = createMemo(() => (
          !!offsetState[uuid] &&
          !!heightState[uuid] && (
            (offsetState[uuid] + heightState[uuid] <= getScroll() - heightState[SCROLL_EL_ID]) ||
            (offsetState[uuid] >= getScroll() + heightState[SCROLL_EL_ID] * 2)
          )
        ))

        createEffect(() => {
          const prevUuid = props.postUuids[getIndex() - 1]
          const prevOffset = prevUuid && offsetState[prevUuid] || 0
          const prevHeight = prevUuid && heightState[prevUuid] || 0
          if (getIndex() && !prevHeight) return
          setOffsetState(uuid, prevOffset + prevHeight + 16)
        })

        return (
          <FeedPostsItem
            uuid={uuid}
            index={getIndex()}
            offset={offsetState[uuid]}
            hidden={isHidden()}
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
