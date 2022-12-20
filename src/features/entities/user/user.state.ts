import { userData } from './user.data'

export const userState = {
  get authed() {
    return !!userData.id
  }
}
