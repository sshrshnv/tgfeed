import { dbStorage } from '~/shared/storage/db-storage'
import { dbFileStorage } from '~/shared/storage/db-file-storage'

import { MethodDeclMap } from '../../mtproto'
import { generateFilePartUuid } from '../../utils/generate-file-part-uuid'

type Handlers = {
  [T in keyof MethodDeclMap]?: (
    res: MethodDeclMap[T]['res'],
    req: MethodDeclMap[T]['req']
  ) => MethodDeclMap[T]['res'] | Promise<MethodDeclMap[T]['res']>
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
  },

  'upload.getFile': async (res, req) => {
    if (res._ !== 'upload.file') {
      return res
    }

    const filePartUuid = generateFilePartUuid(req.location, req.offset)
    await dbFileStorage.setBytes(filePartUuid, res.bytes)

    res.bytes = new ArrayBuffer(0)
    return res
  }
} as const satisfies Handlers

export const handleApiRes = <T extends keyof MethodDeclMap>(
  method: T,
  res: MethodDeclMap[T]['res'],
  req?: MethodDeclMap[T]['req']
): MethodDeclMap[T]['res'] => handlers[method] ? handlers[method](res, req) : res
