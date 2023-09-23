const AVAILABLE_TAGS = [
  'a', 'p', 'b', 'i', 'u', 's', 'pre', 'code', 'input'
]

export const preventContextMenu = () => {
  const handleContextMenu = ev => {
    if (AVAILABLE_TAGS.includes(ev.target.tagName.toLowerCase())) return
    ev.preventDefault()
  }

  self.document.addEventListener('contextmenu', handleContextMenu, { passive: false })
}
