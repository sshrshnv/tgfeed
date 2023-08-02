import type { Component } from 'solid-js'
import { For, createSignal, createResource } from 'solid-js'
import { unwrap } from 'solid-js/store'
import { createStaticStore } from '@solid-primitives/static-store'

import { feedState, setFeedState } from '../feed-state'
import { fetchData } from '../actions'
import { FeedContentPost } from './feed-content-post'

export const FeedContent: Component = () => {
  const [getPageNumber, setPageNumber] = createSignal(0)
  //const [dataRes] = createResource(getPageNumber, fetchData)

  const handlePostMount = (el: Element) => {
    //
  }

  const getPosts = () => unwrap(feedState.postUuids)

  //const [offsetState, setOffsetState] = createStaticStore({ 0: 0 })

  return (
    <div>
      <For each={feedState.postUuids}>{(uuid, getIndex) => (
        <FeedContentPost
          index={getIndex()}
          uuid={uuid}
          onMount={handlePostMount}
        />
      )}</For>
    </div>
  )
}
