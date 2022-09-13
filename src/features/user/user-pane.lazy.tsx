import type { Component } from 'solid-js'

import { useI18n } from '~/i18n'

import { lazyFeature } from '../feature'
import { PaneFeature } from '../pane-feature'

const PATH = './user-pane'

const UserPane = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const UserPaneLazy: Component = () => {
  const { texts, t } = useI18n()

  return (
    <PaneFeature path={PATH} title={t(texts.user.title)}>
      <UserPane/>
    </PaneFeature>
  )
}
