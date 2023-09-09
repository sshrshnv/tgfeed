import type { Component } from 'solid-js'
import { For, createEffect, createSignal, createMemo, onMount, onCleanup, batch} from 'solid-js'
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

export const FeedPosts: Component<FeedPostsProps> = (props) => {
  const SCROLL_EL_ID = 'scrollEl'
  let scrollEl!: HTMLDivElement
  const offsetCache: OffsetState = {}
  const heightCache: HeightState = {}
  const [resizeObserverEls, setResizeObserverEls] = createStore<(Element | undefined)[]>([])
  const [offsetState, setOffsetState] = createStore<OffsetState>({})
  const [heightState, setHeightState] = createStore<HeightState>({})
  const [getScroll, setScroll] = createSignal(0)

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

  const getStyles = () => (props.active ? {
    '--js-line-height': `${FONT_SIZE_LINE_HEIGHT_VALUES[feedState.fontSize]}px`,
    '--js-lines-count': VISIBLE_LINES_COUNT
  } : {
    display: 'none'
  })

  const getLoaderOffset = createMemo(() => {
    const lastPostUuid = getPostUuids()[getPostUuids().length - 1]
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

  createEffect((prev) => {
    if (!!prev === props.active) return
    scrollEl.scrollTo({
      top: 0,
      behavior: 'instant'
    })
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
      <For each={getPostUuids()}>{(uncertainUuid, getIndex) => {
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

      <FeedPostsLoader
        offset={getLoaderOffset()}
        active={isScrollEnd()}
        loading={props.loading}
        onScrollEnd={props.onScrollEnd}
      />
    </div>
  )
}
