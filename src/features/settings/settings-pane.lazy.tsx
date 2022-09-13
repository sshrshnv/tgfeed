import type { Component } from 'solid-js'

import { useI18n } from '~/i18n'

import { lazyFeature } from '../feature'
import { PaneFeature } from '../pane-feature'

const PATH = './settings-pane'

const SettingsPane = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const SettingsPaneLazy: Component = () => {
  const { texts, t } = useI18n()

  return (
    <PaneFeature path={PATH} title={t(texts.settings.title)}>
      <SettingsPane/>
    </PaneFeature>
  )
}
