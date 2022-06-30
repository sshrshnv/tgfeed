export type Db = {
  set: <T>(
    key: string,
    data: T,
    params?: {
      safe?: boolean
      tmp?: boolean
    }
  ) => Promise<void>

  get: <T>(
    key: string,
    params?: {
      safe?: boolean
      tmp?: boolean
      fallback?: T
    }
  ) => Promise<T | undefined>

  clear: (
    params?: {
      safe?: boolean
      tmp?: boolean
    }
  ) => Promise<void>
}

export type LiteDb = {
  set: <T>(
    key: string,
    data: T
  ) => Promise<void>

  get: <T>(
    key: string,
    params?: {
      fallback?: T
    }
  ) => Promise<T | undefined>

  clear: () => Promise<void>
}
