import type { Component } from 'solid-js'
import { Index, createEffect, createSignal, createMemo, onMount, onCleanup, batch, untrack } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { clsx } from 'clsx'

import type { Folder, UncertainPostUuid, PostUuid, PostGroupUuid } from '../feed.types'
import { DEFAULT_FOLDER_ID, FONT_SIZE_LINE_HEIGHT_VALUES, VISIBLE_LINES_COUNT } from '../feed.const'
import { feedState } from '../feed-state'
import { isPostGroupUuid } from '../utils/generate-post-uuid'
import { FeedPostsItem } from './feed-posts-item'
import { FeedPostsLoader } from './feed-posts-loader'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsCSS from './feed-posts.sss'

export type FeedPostsProps = {
  folderId: Folder['id']
  active?: boolean
  loading?: boolean
  onScrollEnd: () => void
}

type HeightState = {
  [uuid in UncertainPostUuid]: number
}

type OffsetState = {
  [uuid in UncertainPostUuid]: number
}

const FEED_POSTS_GAP = 24
const FEED_POSTS_COUNT = 20

export const FeedPosts: Component<FeedPostsProps> = (props) => {
  const SCROLL_EL_ID = 'scrollEl'
  let scrollEl!: HTMLDivElement
  const offsetCache: OffsetState = {}
  const heightCache: HeightState = {}
  const [resizeObserverEls, setResizeObserverEls] = createStore<(Element | undefined)[]>([])
  const [offsetState, setOffsetState] = createStore<OffsetState>({})
  const [heightState, setHeightState] = createStore<HeightState>({})
  const [getScroll, setScroll] = createSignal(0)
  const [getPage, setPage] = createSignal(0)

  const getPostUuids = createMemo(() => {
    if (!props.active) {
      return []
    }

    if (props.folderId === DEFAULT_FOLDER_ID) {
      return feedState.postUuids
    }

    const channelIds = feedState.folders.find(folder =>
      folder.id === props.folderId
    )?.channelIds || []

    return feedState.postUuids.filter(postUuid =>
      channelIds.some(channelId => postUuid.indexOf(channelId) === 0)
    )
  })

  const getPostsCount = createMemo(() =>
    (getPage() + 1) * FEED_POSTS_COUNT
  )

  const getStyles = () => (props.active ? {
    '--js-line-height': `${FONT_SIZE_LINE_HEIGHT_VALUES[feedState.fontSize]}px`,
    '--js-lines-count': VISIBLE_LINES_COUNT
  } : {
    display: 'none'
  })

  const getLoaderOffset = createMemo(() => {
    const lastPostUuid = getPostUuids()[Math.min(getPostsCount() - 1, getPostUuids().length - 1)]
    const lastPostOffset = offsetState[lastPostUuid]
    const lastPostHeight = heightState[lastPostUuid]
    if (lastPostUuid && (!lastPostOffset || !lastPostHeight)) return
    return (lastPostOffset || 0) + (lastPostHeight || 0)
  })

  const isScrollEnd = () => (
    props.active &&
    typeof getLoaderOffset() !== 'undefined' &&
    getLoaderOffset()! <= getScroll() + (heightState[SCROLL_EL_ID] || 0) * 2
  )

  const updatePosition = (uuid: UncertainPostUuid, height: number) => {
    if (uuid as string === SCROLL_EL_ID) {
      setHeightState(uuid, height)
      return
    }

    const uuids = getPostUuids()
    const index = uuids.indexOf(uuid)
    if (index < 0 || height === heightCache[uuid]) return

    const offsetUpdate: OffsetState = {}
    heightCache[uuid] = height

    for (let i = index; i < uuids.length; i++) {
      const uuid = uuids[i]
      if (!heightCache[uuid]) break

      const prevUuid = uuids[i - 1]
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

  const handleScrollEnd = () => {
    setPage(value => value + 1)
    if (getPostUuids().length > getPostsCount()) return
    props.onScrollEnd()
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
    height = Math.round(height)
    if (!height) return
    updatePosition(
      el.id as UncertainPostUuid,
      height
    )
  })

  createEffect((prev) => {
    if (prev && !props.active) {
      setPage(0)
    }
    if (!prev && props.active && untrack(getScroll)) {
      scrollEl.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
    return props.active
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
      <FeedPostsLoader
        offset={getLoaderOffset()}
        active={isScrollEnd()}
        loading={props.loading}
        onScrollEnd={handleScrollEnd}
      />

      <Index each={getPostUuids().slice(0, getPostsCount())}>{(getUuid, index) => {
        const getPostUuid = createMemo<PostUuid>(() => (
          isPostGroupUuid(getUuid()) ? feedState.postGroups[getUuid()][0] : getUuid() as PostUuid
        ))

        const getPostGroupUuid = createMemo<PostGroupUuid | undefined>(() => (
          getPostUuid() === getUuid() ? undefined : getUuid() as PostGroupUuid
        ))

        const isVisible = createMemo(() => (
          !offsetState[getUuid()] ||
          !heightState[getUuid()] || (
            (offsetState[getUuid()] + heightState[getUuid()] >= getScroll() - heightState[SCROLL_EL_ID]) &&
            (offsetState[getUuid()] <= getScroll() + heightState[SCROLL_EL_ID] * 2)
          )
        ))

        const isOnScreen = createMemo(() => (
          !!offsetState[getUuid()] &&
          !!heightState[getUuid()] && (
            (offsetState[getUuid()] >= getScroll() - heightState[SCROLL_EL_ID] / 4) &&
            (offsetState[getUuid()] <= getScroll() + heightState[SCROLL_EL_ID])
          )
        ))

        return (
          <FeedPostsItem
            index={index}
            refId={getUuid()}
            uuid={getPostUuid()}
            groupUuid={getPostGroupUuid()}
            offset={offsetState[getUuid()]}
            visible={isVisible()}
            onScreen={isOnScreen()}
            onMount={addResizeObserverEl}
            onCleanup={removeResizeObserverEl}
          />
        )
      }}</Index>
    </div>
  )
}
