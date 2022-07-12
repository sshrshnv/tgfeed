import type { VoidComponent } from 'solid-js'
import { Index } from 'solid-js/web'
import { clsx } from 'clsx'

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
          class={clsx(
            classes.root,
            classes[`_${image().position}`]
          )}
          position="absolute"
          zIndex="-1"
          {...(image().position === 'left' ?
            { left: '0', bottom: '0' } :
            { right: '0', top: '0' }
          )}
          src={image().url}
        />
      )}
    </Index>
  )
}
