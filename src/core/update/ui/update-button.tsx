import type { Component } from 'solid-js'
import { Show } from 'solid-js'

import { localeState } from '~/core/locale/locale-state'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'
import { Icon } from '~/shared/ui/elements/icon'

import { updateState } from '../update-state'
import { loadUpdate } from '../actions/load-update'

import * as animationsCSS from '~/shared/ui/animations/animations.sss'
import * as updateButtonCSS from './update-button.sss'

export const UpdateButton: Component = () => {
  const handleUpdate = () => {
    loadUpdate()
  }

  return (
    <Button
      class={updateButtonCSS.base}
      onClick={handleUpdate}
      stopImmediatePropagation
    >
      <Show when={!updateState.loading}>
        <Text variant='label' size='large'>
          {localeState.texts?.update.button}
        </Text>
      </Show>

      <Show when={updateState.loading}>
        <Icon
          class={animationsCSS.rotate}
          name='loader'
          size='large'
        />
      </Show>
    </Button>
  )
}
