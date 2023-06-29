import { Show, createMemo, createEffect } from 'solid-js'

import { CoreMenuButton, CoreMenuDialog } from '~/core/ui'
import { FeedHeaderControls } from '~/feed/ui'
import { routing } from '~/shared/routing'
import { Header, Main, Aside, HR } from '~/shared/ui/elements'

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

      <Main class={appViewCSS.main}/>

      <Aside>
        <CoreMenuDialog class={appViewCSS.menu}/>
      </Aside>
    </>
  )
}
