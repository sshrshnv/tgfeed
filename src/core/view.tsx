import { routes } from '~/core/routes'
import { MenuButton, MenuDialog } from '~/core/ui'
import { FeedChannelSearch, FeedOffsetSelect } from '~/feed/ui'
import { Header, Main, Aside } from '~/shared/ui/elements'

export const View = () => {
  return (
    <>
      <Header>
        <MenuButton/>
        <FeedChannelSearch/>
        <FeedOffsetSelect/>
      </Header>

      <Main/>

      <Aside>
        <MenuDialog/>
      </Aside>
    </>
  )
}
