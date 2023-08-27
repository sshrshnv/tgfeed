import type { Component } from 'solid-js'
import { createSignal, createResource, createMemo } from 'solid-js'

import { Progress } from '~/shared/ui/elements'

import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState } from '../feed-state'
import { fetchPosts } from '../actions'
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

  return (
    <>
      <Progress
        class={feedContentCSS.progress}
        active={feedState.initialLoading}
      />
      <FeedPosts
        postUuids={getPostUuids()}
        loading={!feedState.initialLoading && postsRes.loading}
      />
    </>
  )
}
