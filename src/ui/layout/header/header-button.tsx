import type { Component } from 'solid-js'

import type { Route } from '~/router'
import { useRouter } from '~/router'
import { Button, Icon } from '~/ui/elements'

import styles from './header-button.sass'

type Props = {
  route: Route
  icon: Component
}

export const HeaderButton: Component<Props> = (props) => {
  const { pushRoute } = useRouter()

  const handleClick = () => {
    pushRoute(props.route)
  }

  return (
    <Button
      class={styles.base}
      onClick={handleClick}
    >
      <Icon
        class={styles.icon}
        icon={props.icon}
      />
    </Button>
  )
}
