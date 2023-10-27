import type { Component } from 'solid-js'
import { Index, createMemo } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { installState } from '~/core/install/install-state'
import { InstallButton } from '~/core/install/ui/install-button'
import { accountState } from '~/core/account/account-state'
import { authRoutes } from '~/auth/auth-routes'
import { feedRoutes } from '~/feed/feed-routes'
import { CoreLogo } from '~/core/ui/core-logo'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'
import { Icon } from '~/shared/ui/elements/icon'

import * as layoutCSS from '~/shared/ui/elements/layout.sss'
import * as introContentCSS from './intro-content.sss'

import introScreenshotLightUrl from './intro-screenshot-light.png'
import introScreenshotDarkUrl from './intro-screenshot-dark.png'

const OS = ['apple', 'android', 'windows'] as const

const LINKS = [
  { title: 'Telegram', url: process.env.APP_CHANNEL_URL },
  { title: 'GitHub', url: process.env.APP_SOURCE_URL },
  { title: 'Feedback', url: process.env.APP_FEEDBACK_URL }
] as const

export const IntroContent: Component = () => {
  const isInstallButtonDisabled = createMemo(() =>
    !installState.available || installState.completed
  )

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

      <div class={clsx(
        introContentCSS.description,
        layoutCSS.flex,
        layoutCSS.scroll,
        layoutCSS.scrollHidden
      )}>
        <img
          class={clsx(
            introContentCSS.screenshot,
            introContentCSS._light
          )}
          src={introScreenshotLightUrl}
          alt='screenshot'
        />
        <img
          class={clsx(
            introContentCSS.screenshot,
            introContentCSS._dark
          )}
          src={introScreenshotDarkUrl}
          alt='screenshot'
        />

        <div class={clsx(
          introContentCSS.pros,
          layoutCSS.flex
        )}>
          <Index each={localeState.texts?.intro.pros}>{(getPros) => (
            <Text
              class={clsx(
                introContentCSS.item,
                layoutCSS.flex
              )}
              variant='label'
              size='large'
            >
              <Icon name='check' size='large'/>
              {getPros()}
            </Text>
          )}</Index>
        </div>
      </div>

      <div class={clsx(
        introContentCSS.logos,
        layoutCSS.flex
      )}>
        <Index each={OS}>{(getName) => (
          <Icon name={getName()}/>
        )}</Index>
      </div>

      <Text
        class={introContentCSS.install}
        variant='body'
        size='large'
      >
        {localeState.texts?.intro.install}
      </Text>

      <Text
        class={clsx(
          introContentCSS.installWarning,
          !isInstallButtonDisabled() && introContentCSS._hidden
        )}
        variant='body'
        size='small'
      >
        {localeState.texts?.intro.installBrowserWarning}
      </Text>

      <InstallButton
        class={introContentCSS.button}
        disabled={isInstallButtonDisabled()}
      />

      <Button
        class={introContentCSS.button}
        route={accountState.authorized ? feedRoutes.page : authRoutes.page}
      >
        <Text variant='label' size='large'>
          {localeState.texts?.install.link}
        </Text>
      </Button>

      <Text
        class={introContentCSS.server}
        variant='body'
        size='small'
      >
        {localeState.texts?.intro.server}
      </Text>

      <div class={clsx(
        introContentCSS.links,
        layoutCSS.flex
      )}>
        <Index each={LINKS}>{(getLink) => (
          <Text variant='body' size='small'>
            <a
              href={getLink().url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {getLink().title}
            </a>
          </Text>
        )}</Index>
      </div>
    </>
  )
}
