import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { locale } from '~/core/locale'
import { routes } from '~/core/routes'
import { routing } from '~/shared/routing'
import { TransitionDialog, Menu, Text, layoutCSS } from '~/shared/ui/elements'
import { slideInRightAnimation, slideOutLeftAnimation } from '~/shared/ui/animations'

import * as menuDialogCSS from './menu-dialog.sss'

export const MenuDialog: Component = () => {
  const isOpen = () => routing.currentDialogRoute?.id === routes.menu.id

  return (
    <TransitionDialog
      class={clsx(
        menuDialogCSS.base,
        layoutCSS.flex
      )}
      route={routes.menu}
      open={isOpen()}
      inAnimation={slideInRightAnimation}
      outAnimation={slideOutLeftAnimation}
    >
      <menu>
        <Text
          class={menuDialogCSS.title}
          variant='label'
          size='small'
        >
          Channels
        </Text>
        <Menu class={menuDialogCSS.nav} items={[
          { route: routes.feedChannelSearch, icon: 'edit', text: locale.texts?.configureChannels || '' }
        ]}/>

        <Text class={menuDialogCSS.title} variant='label' size='small'>
          Messages
        </Text>
        <Menu class={menuDialogCSS.nav} items={[
          { icon: 'filter', text: locale.texts?.configureFilters || '' },
        ]}/>
      </menu>

      <footer class={clsx(
        menuDialogCSS.footer,
        layoutCSS.flex
      )}>
        <Text variant='label' size='small'>
          {process.env.APP_TITLE}
        </Text>
        <Text variant='label' size='small'>
          v{process.env.APP_VERSION}
        </Text>
      </footer>
    </TransitionDialog>
  )
}
