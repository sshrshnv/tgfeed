export const preloadIconSprite = async () => {
  const hash = self.document.documentElement.dataset.iconSpriteHash
  const path = `/icons${hash ? `.${hash}` : ''}.svg`

  const res = await self.fetch(path)
  const sprite = await res.text()

  self.document.body.insertAdjacentHTML('beforeend', sprite)
}
