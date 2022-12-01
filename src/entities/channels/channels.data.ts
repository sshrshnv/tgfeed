import { createStore } from 'solid-js/store'

//import { db } from '~/db'

import type { ChannelsData } from './channels.type'

//const CHANNELS_DATA_DB_KEY = 'channelsData'

const CHANNELS_DATA_INITIAL_DATA: ChannelsData = {}

export const [channelsData, setChannelsData] = createStore<ChannelsData>({
  ...CHANNELS_DATA_INITIAL_DATA
})
