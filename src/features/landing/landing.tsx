import type { Component } from 'solid-js'

import { useSettings } from '~/store'
import { Block } from '~/ui/elements'

const Landing: Component = () => {
  const { settings } = useSettings()

  return (
    <Block
      position="absolute"
      width="100%"
      height="100%"
    >
    </Block>
  )
}

export default Landing
