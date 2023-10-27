import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'

import { showInstallPrompt } from '../actions/show-install-prompt'

import * as installButtonCSS from './install-button.sss'

export type InstallButtonProps = {
  class?: string
  disabled?: boolean
}

export const InstallButton: Component<InstallButtonProps> = (props) => {
  const handleInstall = () => {
    showInstallPrompt()
  }

  return (
    <Button
      class={clsx(
        props.class,
        installButtonCSS.base
      )}
      disabled={props.disabled}
      onClick={handleInstall}
      opacity
    >
      <Text variant='label' size='large'>
        {localeState.texts?.install.button}
      </Text>
    </Button>
  )
}
