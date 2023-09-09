import { Switch, Match, Show, createEffect, lazy } from 'solid-js'
import { clsx } from 'clsx'

import { CoreMenuButton } from '~/core/ui/core-menu-button'
import { CoreMenuDialog } from '~/core/ui/core-menu-dialog'
import { routingState } from '~/shared/routing/routing-state'
import { Header } from '~/shared/ui/elements/header'
import { Main } from '~/shared/ui/elements/main'
import { Aside } from '~/shared/ui/elements/aside'
import { HR } from '~/shared/ui/elements/hr'

import { introRoutes } from '~/intro/intro-routes'
import { authRoutes } from '~/auth/auth-routes'
import { feedRoutes } from '~/feed/feed-routes'

import * as layoutCSS from './shared/ui/elements/layout.sss'
import * as appViewCSS from './app.view.sss'

const IntroMainContent = lazy(async () => ({ default: (await import('~/intro/ui/intro-main-content')).IntroMainContent }))
const AuthContent = lazy(async () => ({ default: (await import('~/auth/ui/auth-content')).AuthContent }))
const FeedTabs = lazy(async () => ({ default: (await import('~/feed/ui')).FeedTabs }))
const FeedManagingButton = lazy(async () => ({ default: (await import('~/feed/ui')).FeedManagingButton }))
const FeedManagingDialog = lazy(async () => ({ default: (await import('~/feed/ui')).FeedManagingDialog }))
const FeedContent = lazy(async () => ({ default: (await import('~/feed/ui')).FeedContent }))

export const View = () => {
  const isFeed = () => {
    return routingState.currentPageRoute?.id.startsWith('feed')
  }

  createEffect(() => {
    const contains = self.document.body.classList.contains(appViewCSS._uniform)
    if (isFeed() && contains) self.document.body.classList.remove(appViewCSS._uniform)
    if (!isFeed() && !contains) self.document.body.classList.add(appViewCSS._uniform)
  })

  return (
    <>
      <Header class={appViewCSS.header}>
        <HR class={appViewCSS.hr}/>

        <CoreMenuButton class={clsx(
          appViewCSS.headerButton,
          isFeed() && appViewCSS._left
        )}/>

        <Show when={isFeed()}>
          <FeedTabs/>
          <FeedManagingButton class={clsx(
            appViewCSS.headerButton,
            appViewCSS._right
          )}/>
        </Show>
      </Header>

      <Main class={clsx(
        appViewCSS.main,
        layoutCSS.flex,
        isFeed() ? appViewCSS._overflowHidden : [layoutCSS.scroll, layoutCSS.scrollHidden]
      )}>
        <Switch>
          <Match when={routingState.currentPageRoute.id === introRoutes.page.id}>
            <IntroMainContent/>
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
          <FeedManagingDialog class={clsx(
            appViewCSS.menu,
            appViewCSS._right
          )}/>
        </Show>
      </Aside>
    </>
  )
}
