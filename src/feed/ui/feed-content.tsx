import type { Component } from 'solid-js'
import { Index, createSignal, createResource, createEffect, createMemo, onMount } from 'solid-js'

import { service } from '~/shared/service'
import { Progress } from '~/shared/ui/elements/progress'

import type { Folder, ScrollingValue } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState, setFeedState } from '../feed-state'
import { fetchPosts } from '../actions/fetch-posts'
import { listenUpdates } from '../actions/listen-updates'
import { applyUpdates } from '../actions/apply-updates'
import { loadStreamFilePart } from '../utils/load-stream-file-part'
import { FeedPosts } from './feed-posts'

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

  onMount(() => {
    if (feedState.streamsHandlerActivated) return
    service.handleStreams(loadStreamFilePart).then(() => {
      setFeedState('streamsHandlerActivated', true)
    })
  })

  return (
    <>
      <Progress
        class={feedContentCSS.progress}
        active={feedState.initialLoading}
      />
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
    </>
  )
}
