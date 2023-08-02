import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { clsx } from 'clsx'

import { feedState } from '../feed-state'
import { FeedTabsItem } from './feed-tabs-item'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as scrollCSS from '../../shared/ui/elements/scroll.sss'
import * as feedTabsCSS from './feed-tabs.sss'

export const FeedTabs: Component = () => {
  const folders = []
  const folders2 = [
    'Folder1',
    'Folder 2',
    'Folder name',
    'Folder 4',
    'Folder 5'
  ]
  const folders3 = [
    'Folder1',
    'Folder name',
  ]
  return (
    <div class={clsx(
      feedTabsCSS.wrapper,
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
        <FeedTabsItem active>
          All channels
        </FeedTabsItem>

        <For each={folders}>{(folder) => (
          <FeedTabsItem>
            {folder}
          </FeedTabsItem>
        )}</For>
      </div>
    </div>
  )
}
