import type { Component } from 'solid-js'

import { lazyFeature } from '../feature'
import { PageFeature } from '../page-feature'

const PATH = './intro-page'

const IntroPage = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const IntroPageLazy: Component = (props) => {
  return (
    <PageFeature path={PATH}>
      <IntroPage {...props}/>
    </PageFeature>
  )
}
