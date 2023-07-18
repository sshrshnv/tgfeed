import { transfer } from 'comlink'

import type { DBStorage } from '~/shared/storage/db-storage'

import { MethodDeclMap } from '../mtproto'

type Handlers = {
  [T in keyof MethodDeclMap]?: (
    res: MethodDeclMap[T]['res'],
    dbStorage: DBStorage
  ) => MethodDeclMap[T]['res']
}

const handlers = {
  'auth.signIn': (res, dbStorage) => {
    if (res._ === 'auth.authorization' && res.user._ === 'user') {
      if (res.user.photo?._ === 'userProfilePhoto' && !!res.user.photo.stripped_thumb) {
        const stripped_thumb = res.user.photo.stripped_thumb.slice(0)
        dbStorage.put('account', transfer(res.user, [res.user.photo.stripped_thumb]), 'data')
        res.user.photo.stripped_thumb = stripped_thumb
        return transfer(res, [res.user.photo.stripped_thumb])
      }
      dbStorage.put('account', res.user, 'data')
    }
    return res
  },

  'auth.checkPassword': (res, dbStorage) => {
    return handlers['auth.signIn'](res, dbStorage)
  },

  'auth.logOut': (res, dbStorage) => {
    dbStorage.delete('account', 'data')
    return res
  }
} as const satisfies Handlers

export const handleApiRes = <T extends keyof MethodDeclMap>(
  method: T,
  res: MethodDeclMap[T]['res'],
  dbStorage: DBStorage
): MethodDeclMap[T]['res'] => handlers[method] ? handlers[method](res, dbStorage) : res
