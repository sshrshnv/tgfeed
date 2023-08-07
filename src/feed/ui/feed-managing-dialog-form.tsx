import type { Component } from 'solid-js'
import { Show, createResource, createMemo, createSignal } from 'solid-js'
import { clsx } from 'clsx'

import { localeState } from '~/core/locale'
import { popRoute } from '~/shared/routing'
import { parseFormData } from '~/shared/utils'
import { MenuDescription, Form, Input, Icon, Button, Text, MenuTitle } from '~/shared/ui/elements'

import type { Folder } from '../feed.types'
import { feedState } from '../feed-state'
import { feedRoutes } from '../feed-routes'
import { fetchChannels, createFolder, editFolder, deleteFolder } from '../actions'
import { FeedManagingDialogFormChannels } from './feed-managing-dialog-form-channels'

import * as scrollCSS from '../../shared/ui/elements/scroll.sss'
import * as layoutCSS from '../../shared/ui/elements/layout.sss'
import * as animationsCSS from '../../shared/ui/elements/animations.sss'
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
  const [isDeleting, setDeleting] = createSignal(false)

  const isReady = createMemo(() => {
    return channelsRes.state === 'ready'
  })

  const isEmptyChannelsList = createMemo(() => {
    return !Object.keys(feedState.channels).length
  })

  const isEmptyChannelsListError = createMemo(() => {
    return isReady() && isEmptyChannelsList() && !props.transitioning
  })

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
      await (!!props.folder ? editFolder(props.folder.id, data) : createFolder(data))
      popRoute(feedRoutes.managingDialogForm)
    }
  }

  const handleDelete = () => {
    setDeleting(true)
  }

  const handleConfirm = async () => {
    if (!props.folder?.id) return
    setSending(true)
    await deleteFolder(props.folder.id)
    popRoute(feedRoutes.managingDialogForm)
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
          scrollCSS.base,
          scrollCSS._hidden,
          layoutCSS.flex
        )}
        ref={channelsEl}
      >
        <MenuTitle
          class={feedManagingDialogFormCSS.title}
          text={isReady() ?
            localeState.texts?.feed.folderChannelsTitle :
            localeState.texts?.feed.folderChannelsLoading
          }
        />
        <Show when={
          isReady() &&
          !isEmptyChannelsList() &&
          !props.transitioning &&
          !!channelsEl
        }>
          <FeedManagingDialogFormChannels
            folder={props.folder}
            parentEl={channelsEl}
            onChange={handleChange}
          />
        </Show>
      </div>

      <Show when={isReady() && !isEmptyChannelsList()}>
        <div class={clsx(
          feedManagingDialogFormCSS.buttonsWrapper,
          layoutCSS.flex
        )}>
          <Show when={!isDeleting()}>
            <Show when={!!props.folder}>
              <Button
                class={feedManagingDialogFormCSS.deleteButton}
                name='delete'
                disabled={isSending()}
                onClick={handleDelete}
                stopPropagation
              >
                <Icon name='delete' size='large'/>
              </Button>
            </Show>

            <Button
              class={feedManagingDialogFormCSS.primaryButton}
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

          <Show when={isDeleting()}>
            <Button
              class={feedManagingDialogFormCSS.confirmButton}
              name='confirm'
              disabled={isSending()}
              onClick={handleConfirm}
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
                  {localeState.texts?.feed.buttons.confirm}
                </Text>
              </Show>
            </Button>
          </Show>
        </div>
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
