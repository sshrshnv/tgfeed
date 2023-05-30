import type { Component } from 'solid-js'
import { clsx } from 'clsx'

import type { TextProps } from '~/shared/elements'
import { Text } from '~/shared/elements'

import chipCSS from './chip.sss'

type Props = {
  class?: string
  text: string
  size?: TextProps['size']
}

export const Chip: Component<Props> = (props) => {
  return (
    <Text
      class={clsx(
        props.class,
        chipCSS.base
      )}
      variant='label'
      size={props.size || 'small'}
    >
      {props.text}
    </Text>
  )
}
