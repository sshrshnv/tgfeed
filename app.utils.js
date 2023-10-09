const getLocaleLangs = () => {
  const glob = require('glob')
  const path = require('path')
  const localeLangsPath = path.resolve('./src/shared/ui/locales/*.json')

  return glob.sync(localeLangsPath).map(file => {
    const pathParts = file.split('/')
    const localeLang = pathParts.at(-1).split('.')[0]
    return localeLang
  }).reverse()
}

const generateIOSSplashScreens = () => {
  const path = require('path')
  const pwaAssetGenerator = require('pwa-asset-generator')
  const appConfig = require('./app.config')

  pwaAssetGenerator.generateImages(
    path.resolve('./src/shared/ui/icons/manifest/maskable.svg'),
    path.resolve('./src/shared/ui/icons/manifest/splash'),
    {
      // index: path.resolve('./src/app.html'),
      background: appConfig.APP_DEFAULT_THEME_COLOR,
      padding: `calc(50vh - 48px) calc(50vw - 48px)`,
      splashOnly: true,
      type: 'png'
    }
  )
}

module.exports = {
  getLocaleLangs,
  generateIOSSplashScreens
}
