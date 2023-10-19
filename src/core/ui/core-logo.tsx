import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { clsx } from 'clsx'

import { introRoutes } from '~/intro/intro-routes'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'
import { squircleIcon } from '~/shared/ui/icons/manifest'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as coreLogoCSS from './core-logo.sss'

export type CoreLogoProps = {
  class?: string
  title?: boolean
}

export const CoreLogo: Component<CoreLogoProps> = (props) => {
  return (
    <Button
      class={clsx(
        props.class,
        coreLogoCSS.base,
        layoutCSS.flex
      )}
      route={introRoutes.page}
    >
      <img
        class={coreLogoCSS.icon}
        src={squircleIcon}
        alt='logo'
      />

      <Show when={props.title}>
        <Text
          variant='display'
          size='medium'
        >
          TgFeed
        </Text>
      </Show>
    </Button>
  )
}
