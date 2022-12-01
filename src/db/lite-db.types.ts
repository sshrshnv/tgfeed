export type LiteDb = {
  set: <T>(
    key: string,
    data: T
  ) => Promise<void>

  get: <T>(
    key: string
  ) => T | undefined

  getAll: <T>() => T | undefined

  getRestored: <T>() => T | undefined

  clear: () => void
}
