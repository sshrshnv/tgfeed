import type { Component } from 'solid-js'
import { Show, createSignal, onMount, onCleanup } from 'solid-js'
import type { TransitionProps } from 'solid-transition-group'
import { Transition } from 'solid-transition-group'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { Icon } from '~/shared/ui/elements/icon'
import { getTranslateInParams, getTranslateOutParams } from '~/shared/ui/animations'

import * as installIOSPromptCSS from './install-ios-prompt.sss'

const ANIMATION_PARAMS = {
  enter: getTranslateInParams({ translate: '0, 24px' }),
  exit: getTranslateOutParams({ translate: '0, 12px' })
}

export const InstallIOSPrompt: Component = () => {
  const [isVisible, setVisible] = createSignal(false)

  const open = () =>
    setVisible(true)

  const close = () =>
    setVisible(false)

  const handleMenuEnter: TransitionProps['onEnter'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.enter
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  const handleMenuExit: TransitionProps['onExit'] = async (el, done) => {
    const animationParams = ANIMATION_PARAMS.exit
    const animation = el.animate(animationParams.keyframes, animationParams.options)
    await animation.finished
    done()
  }

  onMount(() => {
    self.document.addEventListener('install', open, { passive: true })
  })

  onCleanup(() => {
    self.document.removeEventListener('install', open)
  })

  return (
    <Transition
      onEnter={handleMenuEnter}
      onExit={handleMenuExit}
    >
      <Show when={isVisible()}>
        <div class={installIOSPromptCSS.wrapper}>
          <div
            class={installIOSPromptCSS.overlay}
            aria-label="Close"
            role="button"
          />

          <div
            class={installIOSPromptCSS.base}
            aria-describedby="prompt-description"
            aria-labelledby="prompt-title"
            role="dialog"
          >
            <div class={installIOSPromptCSS.header}>
              <p
                class={installIOSPromptCSS.title}
                id="prompt-title"
              >
                {localeState.texts?.install.ios.title}
              </p>
              <button
                class={installIOSPromptCSS.cancel}
                onClick={close}
              >
                {localeState.texts?.install.ios.cancel}
              </button>
            </div>

            <div class={installIOSPromptCSS.instruction}>
              <div class={installIOSPromptCSS.instructionStep}>
                <Icon
                  name='iosSafari'
                  class={installIOSPromptCSS.safariIcon}
                />
                <p class={clsx(
                  installIOSPromptCSS.text,
                  installIOSPromptCSS._bold
                )}>
                  {localeState.texts?.install.ios.safariStep}
                </p>
              </div>

              <div class={installIOSPromptCSS.instructionStep}>
                <Icon
                  name='iosShare'
                  class={installIOSPromptCSS.shareIcon}
                />
                <p class={clsx(
                  installIOSPromptCSS.text,
                  installIOSPromptCSS._bold
                )}>
                  {localeState.texts?.install.ios.shareStep}
                </p>
              </div>

              <div class={installIOSPromptCSS.instructionStep}>
                <Icon
                  name='iosHomeScreen'
                  class={installIOSPromptCSS.homeScreenIcon}
                />
                <p class={clsx(
                  installIOSPromptCSS.text,
                  installIOSPromptCSS._bold
                )}>
                  {localeState.texts?.install.ios.homeScreenStep}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Transition>
  )
}
