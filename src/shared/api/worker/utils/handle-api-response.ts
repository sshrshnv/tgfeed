import { dbStorage } from '~/shared/storage/db-storage'
import { dbFileStorage } from '~/shared/storage/db-file-storage'

import { MethodDeclMap } from '../../mtproto'
import { generateFilePartUuid } from '../../utils/generate-file-part-uuid'
import { isValidPost } from '../../utils/is-valid-post'
import { isUniquePost } from '../../utils/is-unique-post'

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

  'messages.searchGlobal': res => {
    if (!res || !('messages' in res)) {
      return res
    }

    const messages = [] as typeof res.messages

    for (let i = 0; i < res.messages.length; i++) {
      const message = res.messages[i]

      if (
        !isValidPost(message) ||
        !isUniquePost(message)
      ) continue

      messages.push(message)
    }

    res.messages = messages
    return res
  },

  'upload.getFile': async (res, req) => {
    if (res._ !== 'upload.file') {
      return res
    }

    const filePartUuid = generateFilePartUuid(req.location, req.offset, req.limit)
    await dbFileStorage.setBytes(filePartUuid, res.bytes)

    res.bytes = new ArrayBuffer(0)
    return res
  }
} as const satisfies Handlers

export const handleApiResponse = <T extends keyof MethodDeclMap>(
  method: T,
  res: MethodDeclMap[T]['res'],
  req?: MethodDeclMap[T]['req']
): MethodDeclMap[T]['res'] => handlers[method] ? handlers[method](res, req) : res
