import { accountState } from '~/core/account/account-state'
import { detectOS, detectBrowser, isStandalone } from '~/shared/utils/detect-platform'

const G_ID = process.env.GOOGLE_ANALYTICS_ID
const G_ORIGIN_TAG = 'https://www.googletagmanager.com/gtag/js'
const G_PROXY_TAG = process.env.GOOGLE_ANALYTICS_PROXY_TAG
const G_ORIGIN_EVENT = 'https://www.google-analytics.com/g/collect'
const G_PROXY_EVENT = process.env.GOOGLE_ANALYTICS_PROXY_EVENT

type HTMLScriptElementExtended = HTMLScriptElement & {
  fetchPriority: 'low' | 'high' | 'auto'
}

export const loadAnalyticsScript = () => {
  if (!G_ID) return

  createTagScript()

  if (!G_PROXY_EVENT) {
    createEventScript()
    return
  }

  self.fetch?.(G_ORIGIN_EVENT, {
    'credentials': 'omit',
    'headers': {
      'Accept': '*/*'
    },
    'method': 'POST',
    'mode': 'cors'
  }).then(() => {
    createEventScript()
  }).catch(() => {
    createEventScript({ proxy: true })
  })
}

const createTagScript = ({ proxy = false } = {}) => {
  const tagScript = self.document.createElement('script') as HTMLScriptElementExtended
  tagScript.async = true
  tagScript.fetchPriority = 'low'
  tagScript.src = `${proxy ? G_PROXY_TAG : G_ORIGIN_TAG}?id=${G_ID}`
  if (!proxy) {
    tagScript.onerror = () => createTagScript({ proxy: true })
  }
  self.document.body.insertAdjacentElement('beforeend', tagScript)
}

const createEventScript = ({ proxy = false } = {}) => {
  const tagScript = self.document.createElement('script')
  tagScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${G_ID}', {
      ${proxy ? `transport_url: '${G_PROXY_EVENT}',` : ''}
      anonymize_ip: true,
      lang: '${self.navigator.language}',
      device: '${self.navigator.userAgent}',
      os: '${detectOS()}',
      browser: '${detectBrowser()}',
      authenticated: ${accountState.authorized},
      installed: ${isStandalone()},
      proxied: ${proxy}
    });
  `
  self.document.body.insertAdjacentElement('beforeend', tagScript)
}
