import type { Component } from 'solid-js'
import { Show, For, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'

import { DEFAULT_FOLDER_ID } from '../feed.const'
import { feedState } from '../feed-state'
import { FeedTabsItem } from './feed-tabs-item'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as animationCSS from '~/shared/ui/animations/animations.sss'
import * as feedTabsCSS from './feed-tabs.sss'

export type FeedTabsProps = {
  class?: string
}

export const FeedTabs: Component<FeedTabsProps> = (props) => {
  const hasFolders = () =>
    !!feedState.folders.length

  const isTabsHidden = createMemo(() =>
    feedState.scrolling[feedState.currentFolderId || 0] > 0
  )

  return (
    <div class={clsx(
      props.class,
      feedTabsCSS.wrapper,
      isTabsHidden() && feedTabsCSS._hidden,
      layoutCSS.flex,
      layoutCSS.flexCenter
    )}>
      <div
        class={clsx(
          feedTabsCSS.base,
          feedState.initialLoading && feedTabsCSS._hidden,
          layoutCSS.flex,
          layoutCSS.scroll,
          layoutCSS.scrollHidden,
          animationCSS.forcedPerformance
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
