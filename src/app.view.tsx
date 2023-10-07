import { Switch, Match, Show, createMemo, createEffect, lazy } from 'solid-js'
import { clsx } from 'clsx'

import { CoreMenuButton } from '~/core/ui/core-menu-button'
import { CoreMenuBadge } from '~/core/ui/core-menu-badge'
import { CoreMenuDialog } from '~/core/ui/core-menu-dialog'
import { routingState } from '~/shared/routing/routing-state'
import { Header } from '~/shared/ui/elements/header'
import { Main } from '~/shared/ui/elements/main'
import { Aside } from '~/shared/ui/elements/aside'
import { Footer } from '~/shared/ui/elements/footer'

import { updateState } from '~/core/update/update-state'
import { installState } from '~/core/install/install-state'
import { introRoutes } from '~/intro/intro-routes'
import { authRoutes } from '~/auth/auth-routes'
import { feedRoutes } from '~/feed/feed-routes'
import { feedState } from '~/feed/feed-state'

import * as layoutCSS from './shared/ui/elements/layout.sss'
import * as appViewCSS from './app.view.sss'

const IntroContent = lazy(async () => ({ default: (await import('~/intro/ui/intro-content')).IntroContent }))
const AuthContent = lazy(async () => ({ default: (await import('~/auth/ui/auth-content')).AuthContent }))
const InstallPrompt = lazy(async () => ({ default: (await import('~/core/install/ui/install-ios-prompt')).InstallIOSPrompt }))
const FeedTabs = lazy(async () => ({ default: (await import('~/feed/ui')).FeedTabs }))
const FeedMenuButton = lazy(async () => ({ default: (await import('~/feed/ui')).FeedMenuButton }))
const FeedMenuDialog = lazy(async () => ({ default: (await import('~/feed/ui')).FeedMenuDialog }))
const FeedContent = lazy(async () => ({ default: (await import('~/feed/ui')).FeedContent }))

export const View = () => {
  const isFeed = createMemo(() =>
    routingState.currentPageRoute?.id.startsWith('feed')
  )

  const isHeaderHidden = createMemo(() =>
    isFeed() && feedState.scrolling[feedState.currentFolderId || 0] > 0
  )

  createEffect(() => {
    const contains = self.document.body.classList.contains(appViewCSS._uniform)
    if (isFeed() && contains) self.document.body.classList.remove(appViewCSS._uniform)
    if (!isFeed() && !contains) self.document.body.classList.add(appViewCSS._uniform)
  })

  return (
    <>
      <Header hidden={isHeaderHidden()}>
        <CoreMenuButton/>
        <Show when={isFeed()}>
          <FeedTabs/>
          <FeedMenuButton/>
        </Show>
        <Show when={updateState.available}>
          <CoreMenuBadge/>
        </Show>
      </Header>

      <Main class={clsx(
        appViewCSS.main,
        layoutCSS.flex,
        isFeed() ? appViewCSS._overflowHidden : [layoutCSS.scroll, layoutCSS.scrollHidden]
      )}>
        <Switch>
          <Match when={routingState.currentPageRoute.id === introRoutes.page.id}>
            <IntroContent/>
          </Match>
          <Match when={routingState.currentPageRoute.id === authRoutes.page.id}>
            <AuthContent/>
          </Match>
          <Match when={routingState.currentPageRoute.id === feedRoutes.page.id}>
            <FeedContent/>
          </Match>
        </Switch>
      </Main>

      <Aside position='left'>
        <CoreMenuDialog class={clsx(
          appViewCSS.menu,
          appViewCSS._left
        )}/>
      </Aside>
      <Aside position='right'>
        <Show when={isFeed()}>
          <FeedMenuDialog class={clsx(
            appViewCSS.menu,
            appViewCSS._right
          )}/>
        </Show>
      </Aside>

      <Footer>
        {!installState.completed && (
          <InstallPrompt/>
        )}
      </Footer>
    </>
  )
}
