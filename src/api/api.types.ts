import type { ClientConfig, ClientError, Updates } from './mtproto'

export type Api = {
  getCountry: () => Promise<string>
}

export type ApiError = ClientError & {
  method: string
}

export type ApiErrorHandler = (error: ApiError) => void
export type ApiUpdatesHandler = (updates: Updates) => void

export type ApiWrapper = {
  api: Api
  init: (
    config: Partial<ClientConfig>,
    updatesHandler: ApiUpdatesHandler,
    errorHandler: ApiErrorHandler
  ) => Promise<void>
}
