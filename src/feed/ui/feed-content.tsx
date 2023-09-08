import type { Component } from 'solid-js'
import { createSignal, createResource, createMemo, onMount } from 'solid-js'

import { service } from '~/shared/service'
import { Progress } from '~/shared/ui/elements/progress'

import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState, setFeedState } from '../feed-state'
import { fetchPosts } from '../actions/fetch-posts'
import { loadStreamFilePart } from '../utils/load-stream-file-part'
import { FeedPosts } from './feed-posts'

import * as feedContentCSS from './feed-content.sss'

export const FeedContent: Component = () => {
  const [getPageNumber, setPageNumber] = createSignal(0)
  const [postsRes] = createResource(getPageNumber, fetchPosts)

  const getPostUuids = createMemo(() => {
    if (feedState.currentFolderId === DEFAULT_FOLDER_ID) {
      return feedState.postUuids
    }

    const channelIds = feedState.folders.find(folder =>
      folder.id === feedState.currentFolderId
    )?.channelIds || []

    return feedState.postUuids.filter(postUuid =>
      channelIds.some(channelId => postUuid.indexOf(channelId) === 0)
    )
  })

  const handleLastVisible = () => {
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
      <FeedPosts
        postUuids={getPostUuids()}
        loading={!feedState.initialLoading && postsRes.loading}
        onLastVisible={handleLastVisible}
      />
    </>
  )
}
