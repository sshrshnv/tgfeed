import type { Component } from 'solid-js'
import { For, createSignal, createResource, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { Progress } from '~/shared/ui/elements'

import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState } from '../feed-state'
import { fetchPosts } from '../actions'
import { FeedContentPost } from './feed-content-post'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
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

  const handlePostMount = (el: Element) => {
    //
  }

  //const [offsetState, setOffsetState] = createStaticStore({ 0: 0 })

  return (
    <>
      <Progress
        class={feedContentCSS.progress}
        active={feedState.initialLoading}
      />
      <div
        class={clsx(
          feedContentCSS.base,
          layoutCSS.flex
        )}
      >
        <For each={getPostUuids()}>{(uuid, getIndex) => (
          <FeedContentPost
            index={getIndex()}
            uuid={uuid}
            onMount={handlePostMount}
          />
        )}</For>
      </div>
    </>
  )
}
