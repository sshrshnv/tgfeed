import type { Component } from 'solid-js'
import { For, createSignal, createResource } from 'solid-js'
import { unwrap } from 'solid-js/store'

import { Progress } from '~/shared/ui/elements'

import { feedState, setFeedState } from '../feed-state'
import { fetchPosts } from '../actions'
import { FeedContentPost } from './feed-content-post'

import * as feedContentCSS from './feed-content.sss'

export const FeedContent: Component = () => {
  const [getPageNumber, setPageNumber] = createSignal(0)
  const [postsRes] = createResource(getPageNumber, fetchPosts)

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
      <div>
        <For each={feedState.postUuids}>{(uuid, getIndex) => (
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
