import type { Route } from '~/shared/routing'

export const feedRoutes = {
  page: {
    id: 'feed',
    path: '/me',
    type: 'page'
  },

  searchPage: {
    id: 'feedSearch',
    type: 'page'
  },

  postMenu: {
    id: 'feedPostMenu',
    type: 'state'
  },

  dialog: {
    id: 'feedDialog',
    type: 'dialog'
  },

  dialogFolderMenu: {
    id: 'feedDialogFolderMenu',
    type: 'state'
  },

  formDialog: {
    id: 'feedFormDialog',
    type: 'state'
  }
} as const satisfies Record<string, Route>
