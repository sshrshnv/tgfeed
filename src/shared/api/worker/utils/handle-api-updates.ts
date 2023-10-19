import type { Updates, MessagesMessages, Message } from '~/mtproto'

export const handleApiUpdates = (updates: Updates): Partial<MessagesMessages> | undefined => {
  if (updates._ !== 'updates') return

  const messages: Message[] = []
  updates.updates.forEach(update => {
    if (update._ !== 'updateNewChannelMessage') return
    messages.push(update.message)
  })

  if (!messages.length) return

  return {
    chats: updates.chats,
    messages: messages.toReversed()
  }
}
