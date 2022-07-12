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
    }
  ) => Promise<T | undefined>

  getAll: <T>(
    params?: {
      safe?: boolean
      tmp?: boolean
    }
  ) => Promise<T>

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
  ) => void

  get: <T>(
    key: string
  ) => T | undefined

  getAll: <T>() => T | undefined

  clear: () => void
}
