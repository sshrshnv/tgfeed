import type { Component } from 'solid-js'

import { useI18n } from '~/i18n'

import { lazyFeature } from '../feature'
import { PaneFeature } from '../pane-feature'

const PATH = './auth-pane'

const AuthPane = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const AuthPaneLazy: Component = () => {
  const { texts, t } = useI18n()

  return (
    <PaneFeature path={PATH} title={t(texts.auth.title)}>
      <AuthPane/>
    </PaneFeature>
  )
}
