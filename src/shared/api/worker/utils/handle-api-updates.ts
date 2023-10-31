import type { Updates, MessagesMessages, Message } from '../../mtproto'
import { isValidPost } from '../../utils/is-valid-post'
import { isUniquePost } from '../../utils/is-unique-post'

export const handleApiUpdates = (updates: Updates): Partial<MessagesMessages> | undefined => {
  if (updates._ !== 'updates') return

  const messages: Message[] = []

  for (let i = 0; i < updates.updates.length; i++) {
    const update = updates.updates[i]

    if (
      update._ !== 'updateNewChannelMessage' ||
      !isValidPost(update.message) ||
      !isUniquePost(update.message)
    ) continue

    messages.push(update.message)
  }

  if (!messages.length) return

  return {
    chats: updates.chats,
    messages: messages.toReversed()
  }
}
