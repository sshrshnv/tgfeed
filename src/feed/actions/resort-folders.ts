import type { Folder } from '../feed.types'
import { setFeedState } from '../feed-state'
import { editFolder } from './edit-folder'

export const resortFolders = (
  index: number,
  k: number
) => {
  const updatedFolders: Folder[] = []

  setFeedState('folders', folders => {
    const resortedFolders = [...folders]

    resortedFolders[index] = { ...folders[index + k], index }
    if (resortedFolders[index].index !== folders[index + k].index) {
      updatedFolders.push(resortedFolders[index])
    }

    resortedFolders[index + k] = { ...folders[index], index: index + k }
    if (resortedFolders[index + k].index !== folders[index].index) {
      updatedFolders.push(resortedFolders[index + k])
    }

    return resortedFolders
  })

  return Promise.all(updatedFolders.map(folder =>
    editFolder(folder, { skipStoreUpdate: true })
  ))
}
