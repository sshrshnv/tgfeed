import sha1 from '@cryptography/sha1'

import type { Message } from '../mtproto'

const textHashes: Record<string, true> = {}

export const isUniquePost = (message: Message) => {
  if (message._ !== 'message' || !message.message?.trim()) {
    return true
  }

  const textHash = sha1.stream().update(message.message).digest('hex')

  if (!textHashes[textHash]) {
    textHashes[textHash] = true
    return true
  }

  return false
}
