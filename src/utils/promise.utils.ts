export type PromiseWrapper<T = void> = {
  promise: Promise<T | void>
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reasen?: any) => void
}

export const createPromiseWrapper = <T>() => {
  const promiseWrapper = {} as PromiseWrapper<T>
  promiseWrapper.promise = new self.Promise<T | void>((resolve, reject) => {
    promiseWrapper.resolve = resolve
    promiseWrapper.reject = reject
  })
  return promiseWrapper
}
