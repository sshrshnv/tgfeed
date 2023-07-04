import type { ClientError, ClientMetaData, MethodDeclMap, InputCheckPasswordSRP, AccountPassword } from './mtproto'

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

  localReq: <T extends keyof LocalMethodDeclMap>(
    method: T,
    data: LocalMethodDeclMap[T]['req']
  ) => Promise<LocalMethodDeclMap[T]['res']>
}

export type APIError = ClientError & {
  method: string
}

export type APIWorker = {
  call: APIWorkerCaller
}

export type APIWorkerCaller = <T>(cb: (api: API) => T) => Promise<T>

export type APIWorkerMessage = {
  mainPort: MessagePort
  dbPort: MessagePort
}


export type APIMetaDBSchema = {
  apiMeta: {
    key: 'data'
    value: ClientMetaData
  }
}

export type APIRequestsDBSchema = {
  apiRequests: {
    key: keyof MethodDeclMap
    value: number
  }
}

export type LocalMethodDeclMap = {
  getPasswordKdf: {
    req: {
      passwordAlgo: AccountPassword.accountPassword
      password: string
    }
    res: InputCheckPasswordSRP | undefined
  }
}
