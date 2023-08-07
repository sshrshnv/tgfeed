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

  managingDialogForm: {
    id: 'feedManagingDialogForm',
    type: 'state',
    folderId: ''
  }
} as const satisfies Record<string, Route>
