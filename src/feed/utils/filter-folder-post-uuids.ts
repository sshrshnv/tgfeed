import type { Folder, PostUuids } from '../feed.types'

export const filterFolderPostUuids = (
  folderId: Folder['id'],
  folders: Folder[],
  postUuids: PostUuids
) => {
  const channelIds = folders.find(folder =>
    folder.id === folderId
  )?.channelIds || []

  return postUuids.filter(postUuid =>
    channelIds.some(channelId => postUuid.indexOf(channelId) === 0)
  )
}
