import type { Component } from 'solid-js'
import { Show, For, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'

import { feedState } from '../feed-state'
import { FeedTabsItem } from './feed-tabs-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as scrollCSS from '../../shared/ui/elements/scroll.sss'
import * as feedTabsCSS from './feed-tabs.sss'

export const FeedTabs: Component = () => {
  const hasFolders = createMemo(() => !!feedState.folders.length)

  return (
    <div class={clsx(
      feedTabsCSS.wrapper,
      feedState.initialLoading && feedTabsCSS._hidden
    )}>
      <div
        class={clsx(
          feedTabsCSS.base,
          layoutCSS.flex,
          scrollCSS.base,
          scrollCSS._hidden
        )}
        role="tablist"
      >
        <Show when={feedState.defaultFolderVisibility || !hasFolders()}>
          <FeedTabsItem active>
            {localeState.texts?.feed.defaultFolderName}
          </FeedTabsItem>
        </Show>

        <For each={feedState.folders}>{(folder) => (
          <FeedTabsItem>
            {folder.name}
          </FeedTabsItem>
        )}</For>
      </div>
    </div>
  )
}
