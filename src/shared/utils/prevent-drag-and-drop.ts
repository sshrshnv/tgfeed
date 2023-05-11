export const preventDragAndDrop = () => {
  const handleDrag = ev => {
    ev.stopPropagation()
    ev.preventDefault()

    if (!ev.dataTransfer) return
    try {
      ev.dataTransfer.dropEffect = 'none'
    } catch (_) {}
  }

  const handleDrop = ev => {
    ev.stopPropagation()
    ev.preventDefault()
  }

  self.document.addEventListener('dragover', handleDrag, { passive: false })
  self.document.addEventListener('drop', handleDrop, { passive: false })
}
