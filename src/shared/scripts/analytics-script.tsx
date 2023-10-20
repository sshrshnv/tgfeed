import { Component } from 'solid-js'
import { Show, createSignal, onMount, batch, untrack } from 'solid-js'

import { accountState } from '~/core/account/account-state'
import { detectOS, detectBrowser, isStandalone } from '~/shared/utils/detect-platform'

export const AnalyticsScript: Component = () => {
  const [isReady, setReady] = createSignal(false)
  const [isTagProxied, setTagProxied] = createSignal(false)
  const [isEventProxied, setEventProxied] = createSignal(false)
  const [isEventAllowed, setEventAllowed] = createSignal(false)

  const handleTagError = () => {
    if (untrack(isTagProxied)) return
    setTagProxied(true)
  }

  onMount(() => {
    if (!process.env.GOOGLE_ANALYTICS_ID) return

    self.fetch?.('https://www.google-analytics.com/g/collect', {
      'credentials': 'omit',
      'headers': {
        'Accept': '*/*'
      },
      'method': 'POST',
      'mode': 'cors'
    }).then(() => batch(() => {
      setEventAllowed(true)
      setReady(true)
    })).catch(() => batch(() => {
      setEventProxied(true)
      setReady(true)
    }))
  })

  return (
    <>
      <Show when={isReady()}>
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          onError={handleTagError}
          async
        />
      </Show>

      <Show when={isReady() && isTagProxied()}>
        <script
          src={`/proxy/tag?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          onError={handleTagError}
          async
        />
      </Show>

      <Show when={isReady() && (isEventAllowed() || isEventProxied())}>
        <script
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              ${isEventProxied() ? `transport_url: 'https://${self.location.hostname}/proxy/event',` : ''}
              anonymize_ip: true,
              lang: '${self.navigator.language}',
              device: '${self.navigator.userAgent}',
              os: '${detectOS()}',
              browser: '${detectBrowser()}',
              authenticated: ${untrack(() => accountState.authorized)},
              installed: ${isStandalone()},
              proxied: ${isEventProxied()}
            });
          `}
        />
      </Show>
    </>
  )
}
