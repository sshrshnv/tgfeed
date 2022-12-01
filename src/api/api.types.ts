import type { ClientConfig, ClientMetaData, ClientError, Updates, MethodDeclMap } from './mtproto'

export type ApiMetaUpdateHandler = (meta: Partial<ClientMetaData>) => void
export type ApiErrorHandler = (error: ApiError) => void
export type ApiUpdatesHandler = (updates: Updates) => void

export type Api = {
  init: (
    config: Partial<ClientConfig>,
    metaUpdateHandler: ApiMetaUpdateHandler,
    updatesHandler: ApiUpdatesHandler,
    errorHandler: ApiErrorHandler
  ) => Promise<void>

  call: <T extends keyof MethodDeclMap>(
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

export type ApiError = ClientError & {
  method: string
}
