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

  getMany: <T>(
    keys: string[],
    params?: {
      tmp?: boolean
    }
  ) => Promise<(T | undefined)[]>

  clear: (
    params?: {
      tmp?: boolean
    }
  ) => Promise<void>
}
