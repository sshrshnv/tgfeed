const pkg = require('./package.json')

const utils = {
  getAppVersion: () => {
    return pkg.version
  },

  getPkgVersion: (name, n = 2) => {
    return pkg.dependencies[name].split('.').slice(0, n).join('.')
  },

  getLocaleLangs: () => {
    const glob = require('glob')
    const path = require('path')
    return {}
    //const localeLangsPath = path.resolve('./src/locales/**/lang.json')

    /*return glob.sync(localeLangsPath).reduce((obj, file) => {
      obj[file.split('/').slice(-2)[0]] = require(file)
      return obj
    }, {})*/
  },

  getLocaleTexts: () => {
    const glob = require('glob')
    const path = require('path')
    return {}
    //const localeTextsPath = path.resolve('./src/locales/en/texts/*.json')

    /*const texts = glob.sync(localeTextsPath).reduce((obj, file) => {
      return { ...obj, ...require(file) }
    }, {})

    const deepMapTexts = (filledTexts, cleanedTexts = {}) => {
      Object.keys(filledTexts).forEach(key => {
        const texts = filledTexts[key]
        cleanedTexts[key] = typeof texts === 'string' ? '' : deepMapTexts(texts)
      })
      return cleanedTexts
    }

    return deepMapTexts(texts)*/
  },

  templateParameters: (compilation, assets, assetTags, options) => {
    const params = {}
    Object.keys(compilation.assets).forEach(key => {
      if (!key.startsWith('icons.')) return
      const attributes = ' xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0"'
      compilation.assets[key]._value = compilation.assets[key]._value.replace(attributes, '')
    })
    assetTags = assetTags.headTags.filter(tag => {
      const iconsFileMatch = tag.innerHTML?.match(utils.isDev() ? /icons\.svg/ : /icons\..*\.svg/)
      if (!iconsFileMatch) return true
      params.iconsFileHash = utils.isDev() ? '' : iconsFileMatch[0].split('.')[1]
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
      params
    }
  },

  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production'
}

module.exports = utils
