import type { Component } from 'solid-js'
import { Index, Show, createEffect, createSignal, createMemo, onMount, onCleanup, batch } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { clsx } from 'clsx'

import { isIOS } from '~/shared/utils/detect-platform'

import type { Folder, UncertainPostUuid, PostUuid, PostGroupUuid, ScrollingValue } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedCache } from '../feed-cache'
import { feedState } from '../feed-state'
import { filterFolderPostUuids } from '../utils/filter-folder-post-uuids'
import { getFolderUpdatesCount } from '../utils/get-folder-updates-count'
import { isPostGroupUuid } from '../utils/generate-post-uuid'
import { FeedPostsItem } from './feed-posts-item'
import { FeedPostsStatus } from './feed-posts-status'
import { FeedPostsDateChip } from './feed-posts-date-chip'
import { FeedPostsControls } from './feed-posts-controls'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as feedPostsCSS from './feed-posts.sss'

export type FeedPostsProps = {
  folderId: Folder['id']
  defaultActive?: boolean
  active?: boolean
  loading?: boolean
  end?: boolean
  onScrolling: (folderId: Folder['id'], value: ScrollingValue) => void
  onScrollEnd: () => void
  onApplyUpdates: () => void
}

type HeightState = {
  [uuid in UncertainPostUuid]: number
}

type OffsetState = {
  [uuid in UncertainPostUuid]: number
}

const FEED_POSTS_GAP = 12
const FEED_PAGE_POSTS_COUNT = 20
let firtsActiveFolderRendered = false

export const FeedPosts: Component<FeedPostsProps> = (props) => {
  const SCROLL_EL_ID = 'scrollEl'
  let scrollEl!: HTMLDivElement
  let scroll = 0
  let roughScroll = 0
  const offsetCache: OffsetState = {}
  const heightCache: HeightState = {}
  const [resizeObserverEls, setResizeObserverEls] = createStore<(Element | undefined)[]>([])
  const [offsetState, setOffsetState] = createStore<OffsetState>({})
  const [heightState, setHeightState] = createStore<HeightState>({})
  const [getScroll, setScroll] = createSignal(0)
  const [getRoughScroll, setRoughScroll] = createSignal(0)
  const [getPage, setPage] = createSignal(0)
  const [isUpdating, setUpdating] = createSignal(true)

  const getPostUuids = createMemo(() => {
    if (!props.active || isUpdating()) {
      return []
    }
    if (props.folderId === DEFAULT_FOLDER_ID) {
      return feedState.postUuids
    }
    return filterFolderPostUuids(
      props.folderId,
      feedState.folders,
      feedState.postUuids
    )
  })

  const getPostsCount = createMemo(() =>
    getPostUuids().length
  )

  const getPagePostsCount = createMemo(() =>
    (getPage() + 1) * FEED_PAGE_POSTS_COUNT
  )

  const getStatusOffset = createMemo(() => {
    const lastPostUuid = getPostUuids()[Math.min(getPagePostsCount() - 1, getPostsCount() - 1)]
    const lastPostOffset = offsetState[lastPostUuid]
    const lastPostHeight = heightState[lastPostUuid]
    if (lastPostUuid && (!lastPostOffset || !lastPostHeight)) return
    return (lastPostOffset || 0) + (lastPostHeight || 0)
  })

  const isUpdateButtonVisible = createMemo(() => !!getFolderUpdatesCount(
    props.folderId,
    feedState.folders,
    feedState.newPostUuids
  ))

  const isScrollButtonVisible = createMemo(() =>
    heightState[SCROLL_EL_ID] && getRoughScroll() >= heightState[SCROLL_EL_ID]
  )

  const isBeforeHeaderHidden = createMemo(() => (
    props.active && feedState.scrolling[props.folderId] > 0
  ))

  const isScrollEnd = () => (
    props.active &&
    typeof getStatusOffset() !== 'undefined' &&
    getStatusOffset()! <= getRoughScroll() + (heightState[SCROLL_EL_ID] || 0) * 2
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
    const newScroll = Math.max(Math.round(scrollEl.scrollTop), 0)
    const newRoughScroll = Math.round(newScroll / 100) * 100
    batch(() => {
      if (scroll !== newScroll) {
        scroll = newScroll
        setScroll(newScroll)
      }
      if (roughScroll !== newRoughScroll) {
        let scrolling = newRoughScroll ? +(newRoughScroll > roughScroll) : 0
        roughScroll = newRoughScroll
        setRoughScroll(newRoughScroll)
        if (isScrollButtonVisible()) {
          scrolling = scrolling > 0 ? 2 : -2
        }
        props.onScrolling(
          props.folderId,
          scrolling as ScrollingValue
        )
      }
    })
  }

  const handleScroll = (ev) => {
    ev.stopPropagation()
    self.requestAnimationFrame(updateScroll)
  }

  const handleScrollEnd = () => {
    setPage(value => value + 1)
    if (getPostsCount() > getPagePostsCount()) return
    props.onScrollEnd()
  }

  const scrollToTop = () => {
    scrollEl.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const applyUpdates = () => {
    setUpdating(true)
    self.setTimeout(() => setUpdating(false), 300)
    props.onApplyUpdates()
    setPage(0)
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
    updatePosition(el.id as UncertainPostUuid, height)
  })

  createEffect((prev) => {
    if (prev && !props.active) {
      batch(() => {
        setUpdating(true)
        setPage(0)
        setScroll(0)
        setRoughScroll(0)
      })
    }
    if (!prev && props.active) {
      if (firtsActiveFolderRendered) {
        self.setTimeout(() => setUpdating(false), 300)
      }
      else {
        firtsActiveFolderRendered = true
        setUpdating(false)
      }
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
        !props.active && feedPostsCSS._hidden,
        isBeforeHeaderHidden() && feedPostsCSS._beforeHidden,
        !isIOS() && feedPostsCSS._scrollOffset,
        layoutCSS.flex,
        layoutCSS.scroll,
        layoutCSS.scrollCustom,
        layoutCSS.before
      )}
      id={SCROLL_EL_ID}
      ref={scrollEl}
    >
      <FeedPostsControls
        folderId={props.folderId}
        scrollVisible={isScrollButtonVisible()}
        updateVisible={isUpdateButtonVisible()}
        scroll={scrollToTop}
        update={applyUpdates}
      />

      <FeedPostsStatus
        offset={getStatusOffset()}
        active={isScrollEnd() || isUpdating()}
        loading={props.loading || isUpdating()}
        empty={props.end && !getPostsCount()}
        end={props.end && !!getPostsCount()}
        onScrollEnd={handleScrollEnd}
      />

      <Index each={getPostUuids().slice(0, getPagePostsCount())}>{(getUuid, index) => {
        const getPostUuid = createMemo<PostUuid>(() => (
          isPostGroupUuid(getUuid()) ? feedState.postGroups[getUuid()][0] : getUuid() as PostUuid
        ))

        const getPrevPostUuid = createMemo<PostUuid | undefined>(() => {
          const prevUuid = getPostUuids()[index - 1]
          if (!prevUuid) return
          return isPostGroupUuid(prevUuid) ? feedState.postGroups[prevUuid][0] : prevUuid as PostUuid
        })

        const getPostGroupUuid = createMemo<PostGroupUuid | undefined>(() => (
          getPostUuid() === getUuid() ? undefined : getUuid() as PostGroupUuid
        ))

        const hasDateChip = createMemo(() => {
          const date = new Date(feedCache.posts[getPostUuid()].date * 1000).toDateString()
          const prevDate = getPrevPostUuid() && new Date(feedCache.posts[getPrevPostUuid()!]?.date * 1000).toDateString()
          return !prevDate || date !== prevDate
        })

        const isStickyDateChip = createMemo(() => {
          const date = new Date(feedCache.posts[getPostUuid()].date * 1000).toDateString()
          const todayDate = new Date().toDateString()
          return (
            hasDateChip() &&
            date !== todayDate &&
            !!offsetState[getUuid()] && getScroll() >= offsetState[getUuid()] - FEED_POSTS_GAP
          )
        })

        const isVisible = createMemo(() => (
          !offsetState[getUuid()] ||
          !heightState[getUuid()] || (
            (offsetState[getUuid()] + heightState[getUuid()] >= getRoughScroll() - heightState[SCROLL_EL_ID]) &&
            (offsetState[getUuid()] <= getRoughScroll() + heightState[SCROLL_EL_ID] * 2)
          )
        ))

        const isOnScreen = createMemo(() => (
          !!offsetState[getUuid()] &&
          !!heightState[getUuid()] && (
            (offsetState[getUuid()] >= getRoughScroll() - heightState[SCROLL_EL_ID] / 4) &&
            (offsetState[getUuid()] <= getRoughScroll() + heightState[SCROLL_EL_ID])
          )
        ))

        return (
          <>
            <Show when={hasDateChip()}>
              <FeedPostsDateChip
                uuid={getPostUuid()}
                offset={offsetState[getUuid()]}
                sticky={isStickyDateChip()}
              />
            </Show>

            <FeedPostsItem
              index={index}
              refId={getUuid()}
              uuid={getPostUuid()}
              groupUuid={getPostGroupUuid()}
              offset={offsetState[getUuid()]}
              chipPadding={hasDateChip()}
              visible={isVisible()}
              onScreen={isOnScreen()}
              onMount={addResizeObserverEl}
              onCleanup={removeResizeObserverEl}
            />
          </>
        )
      }}</Index>
    </div>
  )
}
