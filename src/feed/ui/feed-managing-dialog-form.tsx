import type { Component } from 'solid-js'
import { Show, createResource, createSignal } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale/locale-state'
import { popRoute } from '~/shared/routing/actions/pop-route'
import { parseFormData } from '~/shared/utils/parse-form-data'
import { MenuDescription, MenuTitle } from '~/shared/ui/elements/menu'
import { Form } from '~/shared/ui/elements/form'
import { Input } from '~/shared/ui/elements/input'
import { Icon } from '~/shared/ui/elements/icon'
import { Button } from '~/shared/ui/elements/button'
import { Text } from '~/shared/ui/elements/text'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { feedRoutes } from '../feed-routes'
import { fetchChannels } from '../actions/fetch-channels'
import { createFolder } from '../actions/create-folder'
import { editFolder } from '../actions/edit-folder'
import { FeedManagingDialogFormChannels } from './feed-managing-dialog-form-channels'

import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/animations/animations.sss'
import * as feedManagingDialogFormCSS from './feed-managing-dialog-form.sss'

export type FeedManagingDialogFormProps = {
  folder?: Folder
  open?: boolean
  transitioning?: boolean
}

export const FeedManagingDialogForm: Component<FeedManagingDialogFormProps> = (props) => {
  let channelsEl!: HTMLDivElement

  const [channelsRes] = createResource(fetchChannels)
  const [getError, setError] = createSignal('')
  const [isSending, setSending] = createSignal(false)

  const isReady = () =>
    channelsRes.state === 'ready'

  const isEmptyChannelsList = () =>
    !Object.keys(feedState.channelIds).length

  const isEmptyChannelsListError = () =>
    isReady() && isEmptyChannelsList() && !props.transitioning

  const handleChange = () => {
    if (getError()) setError('')
  }

  const handleSubmit = async (formData: FormData) => {
    const data: Folder = parseFormData(formData)
    if (!data.name) {
      setError('FOLDER_NAME_EMPTY')
    } else if (feedState.folders.some(folder =>
      folder.name === data.name &&
      folder.id !== props.folder?.id)
    ) {
      setError('FOLDER_NAME_EXISTS')
    } else if (!data.channelIds?.length) {
      setError('FOLDER_CHANNELS_EMPTY')
    } else {
      setSending(true)
      await (!!props.folder ?
        editFolder({ ...data, id: props.folder.id }) :
        createFolder({ ...data, index: feedState.folders.length })
      )
      popRoute(feedRoutes.managingDialogForm)
    }
  }

  return (
    <Form
      class={clsx(
        feedManagingDialogFormCSS.base,
        layoutCSS.flex,
        layoutCSS.before,
        layoutCSS.after
      )}
      onSubmit={handleSubmit}
    >
      <Input
        class={feedManagingDialogFormCSS.input}
        name='name'
        placeholder={localeState.texts?.feed.folderNamePlaceholder}
        value={props.folder?.name || ''}
        onInput={handleChange}
      />

      <div
        class={clsx(
          feedManagingDialogFormCSS.channels,
          layoutCSS.scroll,
          layoutCSS.scrollHidden,
          layoutCSS.flex
        )}
        ref={channelsEl}
      >
        <MenuTitle
          class={feedManagingDialogFormCSS.title}
          text={localeState.texts?.feed.folderChannelsTitle}
        />
        <Show when={
          isReady() &&
          !isEmptyChannelsList() &&
          !props.transitioning &&
          !!channelsEl
        } fallback={
          <div class={feedManagingDialogFormCSS.loader}>
            <Icon
              class={clsx(
                animationsCSS.rotate,
                animationsCSS.forcedPerformance
              )}
              name='loader'
              size='large'
            />
          </div>
        }>
          <FeedManagingDialogFormChannels
            folder={props.folder}
            parentEl={channelsEl}
            onChange={handleChange}
          />
        </Show>
      </div>

      <Show when={isReady() && !isEmptyChannelsList()}>
        <Button
          class={feedManagingDialogFormCSS.button}
          type='submit'
          name='submit'
          disabled={isSending()}
          stopPropagation
        >
          <Show when={!isSending()}
            fallback={(
              <Icon
                class={animationsCSS.rotate}
                name='loader'
                size='large'
              />
            )}
          >
            <Text variant='label' size='large'>
              {localeState.texts?.feed.buttons.save}
            </Text>
          </Show>
        </Button>
      </Show>

      <MenuDescription
        class={clsx(
          feedManagingDialogFormCSS.error,
          (getError() || isEmptyChannelsListError()) && feedManagingDialogFormCSS._visible
        )}
        text={getError() ?
          localeState.texts?.feed.errors[getError()] :
          localeState.texts?.feed.emptyChannelsList
        }
      />
    </Form>
  )
}
