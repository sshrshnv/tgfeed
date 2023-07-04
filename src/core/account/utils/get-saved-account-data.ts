import { callDbWorker } from '~/shared/db'

export const getSavedAccountData = async () =>
  await callDbWorker(db => db.get('account', 'data'))
