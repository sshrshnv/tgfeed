import { createStore } from 'solid-js/store'

import type { User as UserData } from '~/api/mtproto'
import { liteDb } from '~/db'

const USER_DATA_LITE_DB_KEY = 'userData'

const USER_DATA_INITIAL_DATA: UserData = {
  _: 'userEmpty',
  id: ''
}

export const [userData, setUserData] = createStore<UserData>({
  ...USER_DATA_INITIAL_DATA,
  ...liteDb.getRestored<UserData>()?.[USER_DATA_LITE_DB_KEY]
})
