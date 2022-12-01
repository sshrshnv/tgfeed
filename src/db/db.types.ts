export type Db = {
  set: <T>(
    key: string,
    data: T,
    params?: {
      tmp?: boolean
    }
  ) => Promise<void>

  get: <T>(
    key: string,
    params?: {
      tmp?: boolean
    }
  ) => Promise<T | undefined>

  getAll: <T>(
    params?: {
      tmp?: boolean
    }
  ) => Promise<T>

  clear: (
    params?: {
      tmp?: boolean
    }
  ) => Promise<void>
}
