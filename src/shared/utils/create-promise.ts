export const createPromise = <T>() => {
  let resolve!: (value?: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void

  const promise = new self.Promise<T>((_resolve, _reject) => {
    resolve = _resolve as typeof resolve
    reject = _reject
  })

  return [promise, resolve, reject] as const
}
