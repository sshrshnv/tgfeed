import type { Component } from 'solid-js'

import { lazyFeature } from '../feature'
import { PageFeature } from '../page-feature'

const PATH = './feeds-page'

const FeedsPage = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const FeedsPageLazy: Component = (props) => {
  return (
    <PageFeature path={PATH}>
      <FeedsPage {...props}/>
    </PageFeature>
  )
}
