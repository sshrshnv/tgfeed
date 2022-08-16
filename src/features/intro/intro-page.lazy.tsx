import type { Component } from 'solid-js'

import { lazyFeature, SuspenseFeature } from '../features'

const PATH = './intro-page'

const IntroPage = lazyFeature(
  PATH,
  () => import(`${PATH}`)
)

export const IntroPageLazy: Component = (props) => {
  return (
    <SuspenseFeature path={PATH}>
      <IntroPage {...props}/>
    </SuspenseFeature>
  )
}
