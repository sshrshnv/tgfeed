import type { Component } from 'solid-js'
import { Show, Index, createSignal, createResource, createEffect, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Icon } from '~/shared/ui/elements/icon'

import type { Folder, ScrollingValue } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState, setFeedState } from '../feed-state'
import { fetchPosts } from '../actions/fetch-posts'
import { listenUpdates } from '../actions/listen-updates'
import { applyUpdates } from '../actions/apply-updates'
import { FeedPosts } from './feed-posts'

import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedContentCSS from './feed-content.sss'

export const FeedContent: Component = () => {
  const [getPageNumber, setPageNumber] = createSignal(0)
  const [postsRes] = createResource(getPageNumber, fetchPosts)

  const getFolderIds = createMemo<Folder['id'][]>((prev) => [...new Set([
    ...prev,
    ...feedState.folders.map(folder => folder.id)
  ])], [DEFAULT_FOLDER_ID])

  const handleScrolling = (folderId: Folder['id'], value: ScrollingValue) => {
    if (feedState.scrolling[folderId] === value) return
    setFeedState('scrolling', folderId, value)
  }

  const handleScrollEnd = () => {
    if (feedState.initialLoading || postsRes.loading) return
    setPageNumber(value => value + 1)
  }

  createEffect((prev) => {
    if (prev && !feedState.initialLoading) {
      listenUpdates()
    }
    return feedState.initialLoading
  }, true)

  return (
    <>
      <Index each={getFolderIds()}>{folderId => (
        <FeedPosts
          folderId={folderId()}
          active={!feedState.initialLoading && folderId() === feedState.currentFolderId}
          loading={!feedState.initialLoading && postsRes.loading}
          onScrolling={handleScrolling}
          onScrollEnd={handleScrollEnd}
          onApplyUpdates={applyUpdates}
        />
      )}</Index>

      <Show when={feedState.initialLoading}>
        <Icon
          class={clsx(
            feedContentCSS.loader,
            animationsCSS.rotate
          )}
          name='loader'
          size='large'
        />
      </Show>
    </>
  )
}
