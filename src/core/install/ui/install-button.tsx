import type { Component } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'

import { showInstallPrompt } from '../actions/show-install-prompt'

import * as installButtonCSS from './install-button.sss'

export const InstallButton: Component = () => {
  const handleInstall = () => {
    showInstallPrompt()
  }

  return (
    <Button
      class={installButtonCSS.base}
      onClick={handleInstall}
    >
      <Text variant='label' size='large'>
        {localeState.texts?.install.button}
      </Text>
    </Button>
  )
}
