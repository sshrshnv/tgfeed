import type { Component } from 'solid-js'
import { For } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { Checkbox } from '~/shared/ui/elements/checkbox'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { toggleDefaultFolder } from '../actions/toggle-default-folder'
import { resortFolders } from '../actions/resort-folders'
import { deleteFolder } from '../actions/delete-folder'
import { FeedMenuFoldersItem } from './feed-menu-folders-item'

import * as feedMenuFoldersItemCSS from './feed-menu-folders-item.sss'

export type FeedMenuFoldersProps = {
  openEditingFolderForm: (folder: Folder, ev) => void
}

export const FeedDialogFolders: Component<FeedMenuFoldersProps> = (props) => {
  const hasFolders =
    () => !!feedState.folders.length

  const moveFolder = ({ index, k }, ev) => {
    ev.stopPropagation()
    resortFolders(index, k)
  }

  return (
    <>
      <Checkbox
        class={feedMenuFoldersItemCSS.checkbox}
        text={localeState.texts?.feed.defaultFolderName}
        icon={`folder${hasFolders() ? (feedState.defaultFolderVisibility ? '' : 'Off') : 'Zip'}`}
        checked={feedState.defaultFolderVisibility || !hasFolders()}
        disabled={!hasFolders()}
        onChange={toggleDefaultFolder}
      />

      <For each={feedState.folders}>{(folder, getIndex) => (
        <FeedMenuFoldersItem
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
