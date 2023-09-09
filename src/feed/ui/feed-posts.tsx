import type { Component } from 'solid-js'
import { Show, For, createEffect, onMount, onCleanup, createSignal, createMemo , batch} from 'solid-js'
import { createStore } from 'solid-js/store'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements/icon'

import type { PostUuids, UncertainPostUuid, PostUuid, PostGroupUuid } from '../feed.types'
import { FONT_SIZE_LINE_HEIGHT_VALUES, VISIBLE_LINES_COUNT } from '../feed.const'
import { feedState } from '../feed-state'
import { isPostGroupUuid } from '../utils/generate-post-uuid'
import { FeedPostsItem } from './feed-posts-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedPostsCSS from './feed-posts.sss'

export type FeedPostsProps = {
  postUuids: PostUuids
  loading?: boolean
  onLastVisible: () => void
}

type HeightState = {
  [uuid in UncertainPostUuid]: number
}

type OffsetState = {
  [uuid in UncertainPostUuid]: number
}

const FEED_POSTS_GAP = 24

export const FeedPosts: Component<FeedPostsProps> = (props) => {
  let scrollEl!: HTMLDivElement
  const SCROLL_EL_ID = 'scrollEl'
  const heightCache: HeightState = {}
  const offsetCache: OffsetState = {}
  const [resizeObserverEls, setResizeObserverEls] = createStore<(Element | undefined)[]>([])
  const [heightState, setHeightState] = createStore<HeightState>({})
  const [offsetState, setOffsetState] = createStore<OffsetState>({})
  const [getScroll, setScroll] = createSignal(0)

  const getStyles = () => ({
    '--js-line-height': `${FONT_SIZE_LINE_HEIGHT_VALUES[feedState.fontSize]}px`,
    '--js-lines-count': VISIBLE_LINES_COUNT
  })

  const updatePosition = (uuid: UncertainPostUuid, height: number) => {
    if (uuid as string === SCROLL_EL_ID) {
      setHeightState(uuid, height)
      return
    }

    const index = props.postUuids.indexOf(uuid)
    if (index < 0 || height === heightCache[uuid]) return

    const offsetUpdate: OffsetState = {}
    heightCache[uuid] = height

    for (let i = index; i < props.postUuids.length; i++) {
      const uuid = props.postUuids[i]
      if (!heightCache[uuid]) break

      const prevUuid = props.postUuids[i - 1]
      const prevOffset = offsetCache[prevUuid] || 0
      const prevHeight = heightCache[prevUuid] || 0
      const offset = prevOffset + prevHeight + FEED_POSTS_GAP

      offsetCache[uuid] = offset
      offsetUpdate[uuid] = offset
    }

    self.requestAnimationFrame(() => {
      batch(() => {
        setHeightState(uuid, height)
        setOffsetState(offsetUpdate)
      })
    })
  }

  const updateScroll = () => {
    setScroll(Math.floor(scrollEl.scrollTop / 100) * 100)
  }

  const handleScroll = (ev) => {
    ev.stopPropagation()
    self.requestAnimationFrame(updateScroll)
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

  createResizeObserver(resizeObserverEls, ({ height }, el: Element) => {
    if (!height) return
    updatePosition(
      el.id as UncertainPostUuid,
      Math.round(height)
    )
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
    scrollEl.addEventListener('scroll', handleScroll, { capture: true, passive: true })
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
      style={getStyles()}
      id={SCROLL_EL_ID}
      ref={scrollEl}
    >
      <For each={props.postUuids}>{(uncertainUuid, getIndex) => {
        const getPostUuid = createMemo<PostUuid>(() => (
          isPostGroupUuid(uncertainUuid) ? feedState.postGroups[uncertainUuid][0] : uncertainUuid as PostUuid
        ))

        const getPostGroupUuid = createMemo<PostGroupUuid | undefined>(() => (
          getPostUuid() === uncertainUuid ? undefined : uncertainUuid as PostGroupUuid
        ))

        const isVisible = createMemo(() => (
          !offsetState[uncertainUuid] ||
          !heightState[uncertainUuid] || (
            (offsetState[uncertainUuid] + heightState[uncertainUuid] >= getScroll() - heightState[SCROLL_EL_ID]) &&
            (offsetState[uncertainUuid] <= getScroll() + heightState[SCROLL_EL_ID] * 2)
          )
        ))

        const isOnScreen = createMemo(() => (
          !!offsetState[uncertainUuid] &&
          !!heightState[uncertainUuid] && (
            (offsetState[uncertainUuid] >= getScroll() - heightState[SCROLL_EL_ID] / 4) &&
            (offsetState[uncertainUuid] <= getScroll() + heightState[SCROLL_EL_ID])
          )
        ))

        createEffect((prev) => {
          if (getIndex() !== props.postUuids.length - 1) return
          if (!prev && isVisible()) {
            props.onLastVisible()
          }
          return isVisible()
        })

        return (
          <FeedPostsItem
            index={getIndex()}
            refId={uncertainUuid}
            uuid={getPostUuid()}
            groupUuid={getPostGroupUuid()}
            offset={offsetState[uncertainUuid]}
            visible={isVisible()}
            onScreen={isOnScreen()}
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
