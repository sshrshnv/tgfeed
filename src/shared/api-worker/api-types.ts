import type { ClientMetaData, ClientError, MethodDeclMap } from './mtproto'

export type APIDBSchema = {
  key: 'meta'
  value: ClientMetaData
}

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

export type APIWorker = {
  call: <T>(cb: (api: API) => T) => Promise<T>
}

export type APIWorkerMessage = {
  mainPort: MessagePort
  dbPort: MessagePort
}

export type APIError = ClientError & {
  method: string
}
