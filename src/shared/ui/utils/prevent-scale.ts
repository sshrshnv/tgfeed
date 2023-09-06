import { isIOS } from '~/shared/utils/detect-platform'

export const preventScale = () => {
  const passive = !isIOS()

  const handleGestureStart = ev => {
    ev.preventDefault()
  }

  const handleTouchMove = ev => {
    if (ev.scale <= 1) return
    !passive && ev.preventDefault()
  }

  self.document.addEventListener('gesturestart', handleGestureStart, { passive })
  self.document.addEventListener('touchmove', handleTouchMove, { passive })
}
