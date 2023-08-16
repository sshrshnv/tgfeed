import type { Component } from 'solid-js'
import { For, createMemo } from 'solid-js'

import { localeState } from '~/core/locale'
import { Checkbox } from '~/shared/ui/elements'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { toggleDefaultFolder, resortFolders, deleteFolder } from '../actions'
import { FeedManagingDialogFoldersItem } from './feed-managing-dialog-folders-item'

import * as feedManagingDialogFoldersItemCSS from './feed-managing-dialog-folders-item.sss'

export type FeedManagingDialogFoldersProps = {
  openEditingFolderForm: (folder: Folder, ev) => void
}

export const FeedManagingDialogFolders: Component<FeedManagingDialogFoldersProps> = (props) => {
  const hasFolders = createMemo(() => !!feedState.folders.length)

  const moveFolder = ({ index, k }, ev) => {
    ev.stopPropagation()
    resortFolders(index, k)
  }

  return (
    <>
      <Checkbox
        class={feedManagingDialogFoldersItemCSS.checkbox}
        text={localeState.texts?.feed.defaultFolderName}
        icon={`folder${hasFolders() ? (feedState.defaultFolderVisibility ? '' : 'Off') : 'Zip'}`}
        checked={feedState.defaultFolderVisibility || !hasFolders()}
        disabled={!hasFolders()}
        onChange={toggleDefaultFolder}
      />

      <For each={feedState.folders}>{(folder, getIndex) => (
        <FeedManagingDialogFoldersItem
          folder={folder}
          onEdit={[props.openEditingFolderForm, folder]}
          onMoveUp={getIndex() > 0 ?
            [moveFolder, { index: getIndex(), k: -1 }] :
            undefined
          }
          onMoveDown={(getIndex() < feedState.folders.length - 1) ?
            [moveFolder, { index: getIndex(), k: 1 }] :
            undefined
          }
          onDelete={[deleteFolder, folder]}
        />
      )}
      </For>
    </>
  )
}
