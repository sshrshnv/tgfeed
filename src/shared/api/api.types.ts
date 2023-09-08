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

  exec: <T extends keyof ExecMethodDeclMap>(
    method: T,
    data: ExecMethodDeclMap[T]['req']
  ) => Promise<ExecMethodDeclMap[T]['res']>
}

export type ExecMethodDeclMap = {
  getPasswordKdf: {
    req: {
      passwordAlgo: AccountPassword.accountPassword
      password: string
    }
    res: InputCheckPasswordSRP | undefined
  }
}

export type APIError = ClientError & {
  method: string
}

export type APIStorage = {
  meta: { apiMeta: ClientMetaData }
}
