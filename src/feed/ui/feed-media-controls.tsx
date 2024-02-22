import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import type { IconProps } from '~/shared/ui/elements/icon'
import { Icon } from '~/shared/ui/elements/icon'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as animationsCSS from '~/shared/ui/animations/animations.sss'
import * as feedMediaControlsCSS from './feed-media-controls.sss'

export type FeedMediaControlsProps = {
  icon?: IconProps['name']
  loading: boolean
  center?: boolean
}

export const FeedMediaControls: Component<FeedMediaControlsProps> = (props) => {
  return (
    <div class={clsx(
      feedMediaControlsCSS.base,
      props.center && feedMediaControlsCSS._center,
      layoutCSS.flex,
      layoutCSS.flexCenter
    )}>
      <Show when={props.icon || props.loading}>
        <Icon
          class={clsx(
            props.loading && animationsCSS.rotate
          )}
          name={props.loading ? 'loader' : props.icon!}
          size='large'
        />
      </Show>
    </div>
  )
}
