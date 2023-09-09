import type { Component } from 'solid-js'
import { Index, createSignal, createResource, createMemo, onMount } from 'solid-js'

import { service } from '~/shared/service'
import { Progress } from '~/shared/ui/elements/progress'

import type { Folder } from '../feed.types'
import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState, setFeedState } from '../feed-state'
import { fetchPosts } from '../actions/fetch-posts'
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

  const handleScrollEnd = () => {
    if (feedState.initialLoading || postsRes.loading) return
    setPageNumber(value => value + 1)
  }

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
          onScrollEnd={handleScrollEnd}
        />
      )}</Index>
    </>
  )
}
