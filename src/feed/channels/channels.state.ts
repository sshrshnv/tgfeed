import { createStore } from 'solid-js/store'

import type { Channels } from './channels.types'

export const [channels, setChannels] = createStore<Channels>({})
