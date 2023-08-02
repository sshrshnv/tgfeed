import type { Component } from 'solid-js'

import { localeState } from '~/core/locale'
import { TransitionMenu, MenuHeader } from '~/shared/ui/elements'

import type { Folder } from '../feed.types'
import { feedRoutes } from '../feed-routes'
import * as feedManagingDialogFormCSS from './feed-managing-dialog-form.sss'

export type FeedManagingDialogFormProps = {
  folder?: Folder
  open?: boolean
}

export const FeedManagingDialogForm: Component<FeedManagingDialogFormProps> = (props) => {
  return (
    <TransitionMenu
      class={feedManagingDialogFormCSS.base}
      route={feedRoutes.channelsFolderForm}
      open={props.open}
      scrollable
    >
      <MenuHeader
        title={localeState.texts?.feed[`${!!props.folder ? 'edit' : 'new'}FolderTitle`]}
        backRoute={feedRoutes.channelsFolderForm}
      />
    </TransitionMenu>
  )
}
