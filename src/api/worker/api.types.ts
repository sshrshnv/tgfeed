import type { Client, ClientConfig, ClientMetaData, ClientError, Updates, MethodDeclMap } from '../mtproto'

export type ApiMetaUpdateHandler = (meta: Partial<ClientMetaData>) => void
export type ApiErrorHandler = (error: ApiError) => void
export type ApiUpdatesHandler = (updates: Updates) => void

export type ApiWorker = {
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

  getPasswordKdf: Client['getPasswordKdfAsync']
}

export type ApiError = ClientError & {
  method: string
}
