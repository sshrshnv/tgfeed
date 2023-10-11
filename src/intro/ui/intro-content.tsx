import type { Component } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { CoreLogo } from '~/core/ui/core-logo'
import { Text } from '~/shared/ui/elements/text'

import * as introContentCSS from './intro-content.sss'

export const IntroContent: Component = () => {
  return (
    <>
      <CoreLogo/>

      <Text
        class={introContentCSS.title}
        variant='headline'
        size='large'
      >
        {localeState.texts?.intro.title}
      </Text>

      <Text
        class={introContentCSS.description}
        variant='body'
        size='large'
      >
        {localeState.texts?.intro.description}
      </Text>
    </>
  )
}
