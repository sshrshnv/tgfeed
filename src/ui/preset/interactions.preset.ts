import { isIOS } from '~/utils'

export const preventContextMenu = () => {
  const availableTags = ['textarea', 'input']

  const handleContextMenu = ev => {
    if (availableTags.includes(ev.target.tagName.toLowerCase())) return
    ev.preventDefault()
  }

  self.document.addEventListener('contextmenu', handleContextMenu, { passive: false })
}

export const preventScale = () => {
  const passive = !isIOS()

  const handleGestureStart = ev => {
    ev.preventDefault()
  }

  const handleTouchMove = ev => {
    if (ev.scale <= 1) return
    ev.preventDefault()
  }

  self.document.addEventListener('gesturestart', handleGestureStart, { passive })
  self.document.addEventListener('touchmove', handleTouchMove, { passive })
}

export const preventDragAndDrop = () => {
  const handleDrag = ev => {
    ev.stopPropagation()
    ev.preventDefault()

    if (!ev.dataTransfer) return
    try {
      ev.dataTransfer.dropEffect = 'none'
    } catch (_err) {/* nothing */}
  }

  const handleDrop = ev => {
    ev.stopPropagation()
    ev.preventDefault()
  }

  self.document.addEventListener('dragover', handleDrag, { passive: false })
  self.document.addEventListener('drop', handleDrop, { passive: false })
}
