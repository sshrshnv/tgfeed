import type { Component } from 'solid-js'

import { routes } from '~/core/routes'
import { routing } from '~/shared/routing'
import { TransitionDialog } from '~/shared/ui/elements'
import { slideInRightAnimation, slideOutLeftAnimation } from '~/shared/ui/animations'

import * as menuDialogCSS from './menu-dialog.sss'

export const MenuDialog: Component = () => {
  const isOpen = () => routing.currentDialogRoute?.id === routes.menu.id

  return (
    <TransitionDialog
      class={menuDialogCSS.base}
      route={routes.menu}
      open={isOpen()}
      inAnimation={slideInRightAnimation}
      outAnimation={slideOutLeftAnimation}
    >

    </TransitionDialog>
  )
}
