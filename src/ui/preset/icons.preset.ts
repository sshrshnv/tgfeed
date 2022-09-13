const iconsHash = self.document.documentElement.dataset.icons
const iconsPath = `/icons${iconsHash ? `.${iconsHash}` : ''}.svg`

export const prefetchIcons = async () => {
  const res = await self.fetch(iconsPath)
  const iconsSprite = await res.text()
  self.document.body.insertAdjacentHTML('beforeend', iconsSprite)
  return res
}
