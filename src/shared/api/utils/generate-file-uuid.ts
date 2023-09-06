import type { InputFileLocation } from '../mtproto'

export type PartialLocation = InputFileLocation | {
  id: string
}

export const generateFileUuid = (
  location: PartialLocation
) => {
  if ('photo_id' in location){
    return location.photo_id
  }
  if ('id' in location){
    return location.id
  }
  return ''
}
