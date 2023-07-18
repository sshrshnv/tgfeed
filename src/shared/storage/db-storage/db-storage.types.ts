import type { DBSchema as DBSchemaType, IDBPDatabase } from 'idb'

import type { APIMetaDBSchema, APIRequestsDBSchema } from '~/shared/api'
import type { AccountDBSchema } from '~/core/account'
import type { PostsDBSchema } from '~/feed/posts'
import type { ChannelsDBSchema } from '~/feed/channels'

export interface DBSchema extends DBSchemaType,
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

export type DBStorageManager = IDBPDatabase<DBSchema>
export const DBStorageMethods = ['get', 'getAll', 'add', 'put', 'delete'] as const
export type DBStorage = Pick<DBStorageManager, typeof DBStorageMethods[number]>

export type DBStorageWorkerMessage = {
  mainPort: MessagePort
  apiPort: MessagePort
}
