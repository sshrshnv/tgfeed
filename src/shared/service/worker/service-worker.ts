declare const self: ServiceWorkerGlobalScope

import { comlink } from '~/shared/utils/comlink'

import type { Service } from '../service.types'
import { SERVICE_WORKER_SKIP_WAITING_MESSAGE, SERVICE_STREAM_URL } from '../service.const'
import { workbox } from './utils/workbox'
import { getStreamUrl } from './utils/get-stream-url'
import { handleStream } from './utils/handle-stream'

workbox.setCacheNameDetails({ prefix: 'tgfeed' })
workbox.clientsClaim()

if (process.env.NODE_ENV === 'production') {
  workbox.precacheAndRoute(self.__WB_MANIFEST)
  workbox.cleanupOutdatedCaches()

  workbox.registerRoute(
    ({ request }) => /\.[0-9a-z]{8}\.(avif|webp|png|jpe?g)/.test(request.url),
    new workbox.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.ExpirationPlugin({
          maxAgeSeconds: 365 * 24 * 60 * 60
        })
      ]
    })
  )

  workbox.registerRoute(
    new workbox.NavigationRoute(
      workbox.createHandlerBoundToURL('/index.html'),
      { allowlist: [/^(?!\/__)/] }
    )
  )
}

workbox.registerRoute(
  new RegExp(SERVICE_STREAM_URL),
  handleStream
)

const service: Service = {
  getStreamUrl
}

self.onmessage = (ev) => {
  if (ev.data?.type === SERVICE_WORKER_SKIP_WAITING_MESSAGE) {
    self.skipWaiting()
  }
  if (ev.data?.mainPort) {
    comlink.expose(service, ev.data.mainPort)
  }
}
