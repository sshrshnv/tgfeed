import type { ParentComponent } from 'solid-js'
import { clsx } from 'clsx'

import { RouteButton, useRoute } from '~/router'
import { Block } from '~/ui/layout'
import { CrossSVG } from '~/ui/icons'
import { overlayStyles } from '~/ui/styles'

import styles from './popup-page-header.sass'

export const PopupPageHeader: ParentComponent = (props) => {
  const { route } = useRoute()

  return (
    <Block class={clsx(
      styles.base,
      overlayStyles.base,
      overlayStyles._top
    )}>
      {props.children}
      <RouteButton back route={route} icon={CrossSVG} view="control"/>
    </Block>
  )
}
