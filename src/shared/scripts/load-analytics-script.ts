import { accountState } from '~/core/account/account-state'
import { detectOS, detectBrowser, isStandalone } from '~/shared/utils/detect-platform'

export const loadAnalyticsScript = () => {
  if (!process.env.GOOGLE_ANALYTICS_ID) return

  createTagScript()

  self.fetch?.('https://www.google-analytics.com/g/collect', {
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
  const tagScript = self.document.createElement('script') as HTMLScriptElement & {
    fetchPriority: 'low' | 'high' | 'auto'
  }
  tagScript.async = true
  tagScript.fetchPriority = 'low'
  tagScript.src = proxy ? `/proxy/tag/js?id=${process.env.GOOGLE_ANALYTICS_ID}` : `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`
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
    gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
      ${proxy ? `transport_url: 'https://${self.location.hostname}/proxy/event/',` : ''}
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
