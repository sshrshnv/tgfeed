import { API_LOADING_PART_SIZE } from '~/shared/api/api.const'

export const calcOffset = (from: number, limit: number) =>
  from - (from % limit)

export const calcLimit = (from: number, to: number) => (to && to < API_LOADING_PART_SIZE) ?
  Math.min(2 ** Math.ceil(Math.log(to - from + 1) / Math.log(2)), API_LOADING_PART_SIZE) :
  API_LOADING_PART_SIZE
