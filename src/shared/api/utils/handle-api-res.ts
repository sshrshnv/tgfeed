import { dbStorage } from '~/shared/storage/db-storage'

import { MethodDeclMap } from '../mtproto'

type Handlers = {
  [T in keyof MethodDeclMap]?: (
    res: MethodDeclMap[T]['res']
  ) => MethodDeclMap[T]['res']
}

const handlers = {
  'auth.signIn': res => {
    if (res._ === 'auth.authorization' && res.user._ === 'user') {
      dbStorage.set('accountData', res.user)
    }
    return res
  },

  'auth.checkPassword': res => {
    return handlers['auth.signIn'](res)
  },

  'auth.logOut': res => {
    dbStorage.del('accountData')
    return res
  }
} as const satisfies Handlers

export const handleApiRes = <T extends keyof MethodDeclMap>(
  method: T,
  res: MethodDeclMap[T]['res']
): MethodDeclMap[T]['res'] => handlers[method] ? handlers[method](res) : res
