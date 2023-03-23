import type { DBSchema as DBSchemaTypes, IDBPDatabase } from 'idb'

import type { APIDBSchema } from '~/shared/api-worker'
import type { PostsDBSchema } from '~/feed/posts'
import type { ChannelsDBSchema } from '~/feed/channels'

export interface DBSchema extends DBSchemaTypes {
  api: APIDBSchema
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
