import type { Update } from '~/shared/api/mtproto'
import { api } from '~/shared/api'

import type { Config } from '../feed.types'
import { feedState, setFeedState } from '../feed-state'
import { stringifyConfigMessage, generateRandomId } from '../utils'

export const saveConfig = (
  data: Partial<Config>,
  {
    skipStateUpdate = false
  } = {}
) => {
  const config: Config = {
    configId: feedState.configId,
    defaultFolderVisibility: feedState.defaultFolderVisibility,
    ...data
  }

  if (!skipStateUpdate) {
    setFeedState(config)
  }

  if (config.configId) {
    return api.req('messages.editMessage', {
      peer: {
        _: 'inputPeerSelf'
      },
      message: stringifyConfigMessage(config),
      id: config.configId
    })
  }

  const random_id = generateRandomId()

  return api.req('messages.sendMessage', {
    peer: {
      _: 'inputPeerSelf'
    },
    message: stringifyConfigMessage(config),
    random_id
  }).then(res => {
    if (res._ !== 'updates') return

    const update = res.updates.find(update =>
      update._ === 'updateMessageID' && update.random_id === random_id
    ) as Update.updateMessageID | undefined

    if (!update?.id) return

    setFeedState('configId', update.id)
  })
}
