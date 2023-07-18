import { Switch, Match, Show, createMemo, createEffect, lazy } from 'solid-js'
import { clsx } from 'clsx'

import { CoreMenuButton, CoreMenuDialog } from '~/core/ui'
import { routing } from '~/shared/routing'
import { Header, Main, Aside, HR } from '~/shared/ui/elements'

import { introRoutes } from '~/intro'
import { authRoutes } from '~/auth'
import { feedRoutes } from '~/feed'

const IntroMainContent = lazy(async () => ({ default: (await import('~/intro/ui')).IntroMainContent }))
const AuthMainContent = lazy(async () => ({ default: (await import('~/auth/ui')).AuthMainContent }))
const FeedHeaderControls = lazy(async () => ({ default: (await import('~/feed/ui')).FeedHeaderControls }))
const FeedMainContent = lazy(async () => ({ default: (await import('~/feed/ui')).FeedMainContent }))

import * as layoutCSS from './shared/ui/elements/layout.sss'
import * as scrollCSS from './shared/ui/elements/scroll.sss'
import * as appViewCSS from './app.view.sss'

export const View = () => {
  const isFeed = createMemo(() => {
    return routing.currentPageRoute?.id.startsWith('feed')
  })

  createEffect(() => {
    const contains = self.document.body.classList.contains(appViewCSS._uniform)
    if (isFeed() && contains) self.document.body.classList.remove(appViewCSS._uniform)
    if (!isFeed() && !contains) self.document.body.classList.add(appViewCSS._uniform)
  })

  return (
    <>
      <Header class={appViewCSS.header}>
        <HR class={appViewCSS.hr}/>

        <CoreMenuButton/>

        <Show when={isFeed()}>
          <FeedHeaderControls/>
        </Show>
      </Header>

      <Main class={clsx(
        appViewCSS.main,
        !isFeed() && [layoutCSS.flex, scrollCSS.base, scrollCSS._hidden]
      )}>
        <Switch>
          <Match when={routing.currentPageRoute.id === introRoutes.page.id}>
            <IntroMainContent/>
          </Match>
          <Match when={routing.currentPageRoute.id === authRoutes.page.id}>
            <AuthMainContent/>
          </Match>
          <Match when={routing.currentPageRoute.id === feedRoutes.page.id}>
            <FeedMainContent/>
          </Match>
        </Switch>
      </Main>

      <Aside>
        <CoreMenuDialog class={appViewCSS.menu}/>
      </Aside>
    </>
  )
}
