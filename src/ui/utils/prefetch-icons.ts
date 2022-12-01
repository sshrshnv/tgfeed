export const prefetchIcons = async () => {
  const iconsHash = self.document.documentElement.dataset.icons
  const iconsPath = `/icons${iconsHash ? `.${iconsHash}` : ''}.svg`

  const res = await self.fetch(iconsPath)
  const iconsSprite = await res.text()

  self.document.body.insertAdjacentHTML('beforeend', iconsSprite)
}
