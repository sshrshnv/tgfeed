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

  managingDialog: {
    id: 'feedManagingDialog',
    type: 'dialog'
  },

  managingDialogFolderMenu: {
    id: 'feedManagingDialogFolderMenu',
    type: 'state'
  },

  managingDialogForm: {
    id: 'feedManagingDialogForm',
    type: 'state'
  }
} as const satisfies Record<string, Route>
