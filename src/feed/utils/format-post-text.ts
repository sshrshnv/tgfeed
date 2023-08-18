import sanitize from 'sanitize-markdown'

import type { MessageEntity } from '~/shared/api/mtproto'

const START_LINK_TAG = '<a href="$1" target="_blank" rel="noopener noreferrer">'
const END_LINK_TAG = '</a>'

const ENTITY_TYPES = {
  messageEntityTextUrl: { startTag: START_LINK_TAG, endTag: END_LINK_TAG },
  messageEntityUrl: { startTag: START_LINK_TAG, endTag: END_LINK_TAG },
  messageEntityPre: { startTag: '<pre>', endTag: '</pre>' },
  messageEntityCode: { startTag: '<code>', endTag: '</code>' },
  messageEntityBold: { startTag: '<b>', endTag: '</b>' },
  messageEntityItalic: { startTag: '<i>', endTag: '</i>' },
  messageEntityUnderline: { startTag: '<u>', endTag: '</u>' },
  messageEntityStrike: { startTag: '<s>', endTag: '</s>' },
}

export const formatPostText = (text: string, entities?: MessageEntity[]) => {
  if (!text || !entities?.length) return text

  const sortedEntities = entities
    .filter(entity => !!ENTITY_TYPES[entity._])
    .flatMap(entity => [{
      index: entity.offset,
      getTag: () => {
        if (entity._ === 'messageEntityTextUrl') {
          return ENTITY_TYPES[entity._].startTag.replace('$1', normalizeUrl(entity.url))
        } else if (entity._ === 'messageEntityUrl') {
          const url = text.substring(entity.offset, entity.offset + entity.length)
          return ENTITY_TYPES[entity._].startTag.replace('$1', normalizeUrl(url))
        } else {
          return ENTITY_TYPES[entity._].startTag
        }
      }
    }, {
      index: entity.offset + entity.length,
      getTag: () => {
        return ENTITY_TYPES[entity._].endTag
      },
      end: true
    }])
    .sort((a, b) => {
      return (a.index === b.index && a.end && b.end) ? -1 : a.index - b.index
    })

  let offset = 0

  const formattedText = sortedEntities.reduce((str, entity) => {
    const start = str.substring(0, entity.index + offset)
    const end = str.substring(entity.index + offset)
    const tag = entity.getTag()
    const substr = `${start}${tag}${end}`
    offset = offset + tag.length
    return substr
  }, text)

  return sanitezeText(formattedText)
}

const sanitezeText = (text: string) => sanitize(text, {
  allowedTags: ['a', 'pre', 'code', 'b', 'i', 'u', 's'],
  allowedAttributes: {
    a: ['href', 'target', 'rel']
  }
})

const normalizeUrl = (url: string) =>
  `https://${url.replaceAll(/https?:\/\/?/ig, '')}`
