import type { ClientError, MethodDeclMap } from './worker/mtproto'

export type API = {
  req: <T extends keyof MethodDeclMap>(
    method: T,
    data?: MethodDeclMap[T]['req'],
    params?: {
      dc?: number
      thread?: number
      timeout?: number
      attempt?: number
    }
  ) => Promise<MethodDeclMap[T]['res']>
}

export type APIError = ClientError & {
  method: string
}

export type APIWorker = {
  call: <T>(cb: (api: API) => T) => Promise<T>
}

export type APIWorkerMessage = {
  mainPort: MessagePort
  dbPort: MessagePort
}
