import type { Message, Peer } from '~/workers/api/worker/mtproto'

export type Post = Omit<Message.message, 'peer_id'> & {
  uuid: `${Message.message['id']}-${Peer.peerChannel['channel_id']}`
  peer: Peer.peerChannel
  peer_id: Peer.peerChannel['channel_id']
}

export type PostsDBSchema = {
  key: Post['uuid']
  value: Post
  indexes: {
    date: Post['date']
    peer_id: Post['peer_id']
  }
}
