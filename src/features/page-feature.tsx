import type { ParentComponent } from 'solid-js'

import { SuspenseFeature } from './feature'

type Props = {
  path: string
}

export const PageFeature: ParentComponent<Props> = (props) => {
  return (
    <SuspenseFeature path={props.path}>
      {props.children}
    </SuspenseFeature>
  )
}
