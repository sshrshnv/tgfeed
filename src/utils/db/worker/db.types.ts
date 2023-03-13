export type DbWorker = {
  set: <T>(
    key: IDBValidKey,
    data: T,
    params?: {
      tmp?: boolean
    }
  ) => Promise<void>

  get: <T>(
    key: IDBValidKey,
    params?: {
      tmp?: boolean
      many?: false
    }
  ) => Promise<T | undefined>

  clear: (
    params?: {
      tmp?: boolean
    }
  ) => Promise<void>
}
