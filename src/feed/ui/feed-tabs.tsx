import type { Component } from 'solid-js'
import { Show, For, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'

import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState } from '../feed-state'
import { FeedTabsItem } from './feed-tabs-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
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
          layoutCSS.scroll,
          layoutCSS.scrollHidden
        )}
        role="tablist"
      >
        <Show when={feedState.defaultFolderVisibility || !hasFolders()}>
          <FeedTabsItem folderId={DEFAULT_FOLDER_ID}>
            {localeState.texts?.feed.defaultFolderName}
          </FeedTabsItem>
        </Show>

        <For each={feedState.folders}>{(folder) => (
          <FeedTabsItem folderId={folder.id}>
            {folder.name}
          </FeedTabsItem>
        )}</For>
      </div>
    </div>
  )
}
