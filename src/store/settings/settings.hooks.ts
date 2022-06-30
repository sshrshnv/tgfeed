import { useStore } from '../store'

export const useSettings = () => {
  const [store] = useStore()

  return {
    settings: store.settings
  }
}
