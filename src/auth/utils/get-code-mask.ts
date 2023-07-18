import type { AuthSentCodeType } from '~/shared/api/mtproto'

export const getCodeMask = (type: AuthSentCodeType | undefined, char = '9') => {
  let length = 5
  if (type?._ === 'auth.sentCodeTypeApp') {
    length = type.length
  }
  return Array.from(new Array(length), _v => char).join(' ')
}
