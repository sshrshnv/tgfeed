import type { VoidComponent } from 'solid-js'
import { Index } from 'solid-js/web'
import cl from 'clsx'

import { Image } from '~/ui/elements'

import imageUrl from './background.svg'
import classes from './background.styl'

const IMAGES = [
  { position: 'left', url: imageUrl },
  { position: 'right', url: imageUrl }
]

export const Background: VoidComponent = () => {
  return (
    <Index each={IMAGES}>
      {(image) => (
        <Image
          class={cl(
            classes.root,
            classes[`_${image().position}`]
          )}
          src={image().url}
        />
      )}
    </Index>
  )
}
