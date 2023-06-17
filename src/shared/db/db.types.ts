import type { DBSchema as DBSchemaTypes, IDBPDatabase } from 'idb'

import type { APIMetaDBSchema, APIRequestsDBSchema } from '~/shared/api'
import { AccountDBSchema } from '~/core/account'
import type { PostsDBSchema } from '~/feed/posts'
import type { ChannelsDBSchema } from '~/feed/channels'

export interface DBSchema extends DBSchemaTypes,
  APIMetaDBSchema,
  APIRequestsDBSchema,
  AccountDBSchema,
  ChannelsDBSchema,
  PostsDBSchema
{
  state: {
    key: string
    value: any
  }
}

export type DB = IDBPDatabase<DBSchema>

export type DBWorker = {
  call: DBWorkerCaller
}

export type DBWorkerCaller = <T>(
  cb: (db: DB) => T
) => Promise<T>

export type DBWorkerMessage = {
  mainPort: MessagePort
  apiPort: MessagePort
}
