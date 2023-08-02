import { setFeedState } from '../feed-state'
import { loadConfig, loadData } from '../utils'

let configLoaded = false

export const fetchData = async (pageNumber: number) => {
  const res = { next: false }
  if (configLoaded) {
    const { postUuids, channels, posts, next } = await loadData({ next: !!pageNumber })
    setFeedState(state => ({
      postUuids: pageNumber ? [...state.postUuids, ...postUuids] : postUuids,
      channels,
      posts
    }))
    res.next = next
  } else {
    const [
      { channelFilters, postFilters },
      { postUuids, channels, posts, next }
    ] = await Promise.all([
      loadConfig(),
      loadData({ next: false })
    ])
    setFeedState({
      postUuids,
      channels,
      posts,
      channelFilters,
      postFilters,
    })
    configLoaded = true
    res.next = next
  }
  return res
}
