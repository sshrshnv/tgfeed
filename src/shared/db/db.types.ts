import type { DBSchema as DBSchemaTypes, IDBPDatabase } from 'idb'

import type { PostsDBSchema } from '~/feed/entities/posts'
import type { ChannelsDBSchema } from '~/feed/entities/channels'

export interface DBSchema extends DBSchemaTypes {
  state: {
    key: string
    value: any
  }
  posts: PostsDBSchema
  channels: ChannelsDBSchema
}

export type DB = IDBPDatabase<DBSchema>

export type DBWorker = {
  call: <T>(cb: (db: DB) => T) => Promise<T>
}

export type DBWorkerMessage = {
  mainPort: MessagePort
  apiPort: MessagePort
}
