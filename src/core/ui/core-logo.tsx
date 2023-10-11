import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { Text } from '~/shared/ui/elements/text'
import { squircleIcon } from '~/shared/ui/icons/manifest'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as coreLogoCSS from './core-logo.sss'

export type CoreLogoProps = {
  class?: string
}

export const CoreLogo: Component<CoreLogoProps> = (props) => {
  return (
    <div class={clsx(
      props.class,
      coreLogoCSS.base,
      layoutCSS.flex
    )}>
      <img
        class={coreLogoCSS.icon}
        src={squircleIcon}
        alt='logo'
      />

      <Text
        variant='display'
        size='medium'
      >
        TgFeed
      </Text>
    </div>
  )
}
