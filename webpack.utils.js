const pkg = require('./package.json')
const appConfig = require('./app.config')

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'

const getPkgVersion = (name, n = 2) =>
  pkg.dependencies[name].split('.').slice(0, n).join('.')

const templateParameters = (compilation, assets, assetTags, options) => {
  let APP_ICON_SPRITE_HASH = ''

  Object.keys(compilation.assets).forEach(key => {
    if (!key.startsWith('icons.')) return
    const attributes = ' xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0"'
    compilation.assets[key]._value = compilation.assets[key]._value.replace(attributes, '')
  })

  assetTags = assetTags.headTags.filter(tag => {
    const iconSpriteFileMatch = tag.innerHTML?.match(isDev() ? /icons\.svg/ : /icons\..*\.svg/)
    if (!iconSpriteFileMatch) return true
    APP_ICON_SPRITE_HASH = isDev() ? '' : iconSpriteFileMatch[0].split('.')[1]
    return false
  })

  return {
    compilation,
    webpackConfig: compilation.options,
    htmlWebpackPlugin: {
      tags: assetTags,
      files: assets,
      options
    },
    params: {
      ...appConfig,
      APP_ICON_SPRITE_HASH
    }
  }
}

module.exports = {
  isDev,
  isProd,

  getPkgVersion,
  templateParameters
}
