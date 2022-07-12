import type { ParentComponent, JSX } from 'solid-js'
import { Show } from 'solid-js/web'

import { Content, Header, Logo, Block } from '~/ui/elements'

type Props = {
  scrollable?: boolean
  contentLogo?: boolean
  contentLoader?: boolean
  headerLogo?: boolean
  headerChildren?: JSX.Element
}

export const Page: ParentComponent<Props> = (props) => {
  return (
    <Block
      width="100%"
      height="100%"
      overflow={props.scrollable ? 'auto' : 'hidden'}
      scrollbar="none"
    >
      <Header>
        <Show when={props.headerLogo}>
          <Logo icon/>
        </Show>
        {props.headerChildren}
      </Header>

      <Content>
        <Show when={props.contentLogo}>
          <Block
            display="flex"
            flexJustify="center"
          >
            <Logo title/>
          </Block>
        </Show>

        {props.children}
      </Content>
      {props.children}
    </Block>
  )
}
