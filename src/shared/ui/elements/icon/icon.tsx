import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { clsx } from 'clsx'

import * as icons from '~/shared/ui/icons/sprite'

import * as iconCSS from './icon.sss'

export type IconProps = ComponentProps<'svg'> & {
  name: keyof typeof icons
  size?: 'small' | 'medium' | 'large'
}

export const Icon: Component<IconProps> = (props) => {
  const [iconProps, svgProps] = splitProps(props, ['name', 'size'])

  return (
    <svg
      {...svgProps}
      class={clsx(
        props.class,
        iconCSS.base,
        iconCSS[`_${iconProps.size}`]
      )}
    >
      <use href={`#${icons[iconProps.name].id}`}/>
    </svg>
  )
}
