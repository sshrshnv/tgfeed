import { unwrap } from 'solid-js/store'

import type { InputMessage } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { ChannelId, Posts, PostData, PostId } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'
import { generatePostUuid } from '../utils'

export const refetchPosts = async (
  channel_id: ChannelId,
  ids: PostId[]
) => {
  if (!ids.length) return

  const { access_hash = '' } = unwrap(feedState).channels[channel_id]

  const res = await api.req('channels.getMessages', {
    channel: {
      _: 'inputChannel',
      channel_id,
      access_hash
    },
    id: ids.map(id => ({
      _: 'inputMessageID',
      id
    }) as InputMessage)
  })

  if (res._ !== 'messages.channelMessages') return

  const posts = (res.messages as PostData[]).reduce((posts, post: PostData) => {
    const postUuid = generatePostUuid(post)
    posts[postUuid] = post
    return posts
  }, {} as Posts)

  setFeedState('posts', posts)
}
