import type { ParentComponent, ComponentProps } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import { clsx } from 'clsx'

import type { Route } from '~/shared/routing'
import { popRoute } from '~/shared/routing/actions/pop-route'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'
import { Icon } from '~/shared/ui/elements/icon'

import * as layoutCSS from '../layout.sss'
import * as menuHeaderCSS from './menu-header.sss'

export type MenuHeaderProps = ComponentProps<'header'> & {
  title?: string
  backRoute?: Route
}

export const MenuHeader: ParentComponent<MenuHeaderProps> = (_props) => {
  const [props, headerProps] = splitProps(_props, [
    'class', 'title', 'backRoute'
  ])

  const handleBack = () => {
    popRoute(props.backRoute)
  }

  return (
    <header {...headerProps}
      class={clsx(
        props.class,
        menuHeaderCSS.base,
        layoutCSS.flex,
        layoutCSS.flexCenter
      )}
    >
      <Text variant='label' size='small'>
        {props.title}
      </Text>

      <Show when={!!props.backRoute}>
        <Button
          class={menuHeaderCSS.button}
          onClick={handleBack}
          stopPropagation
        >
          <Icon name='back' size='medium'/>
        </Button>
      </Show>
    </header>
  )
}
