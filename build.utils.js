const pkg = require('./package.json')

module.exports = {
  getAppVerion: () => {
    return pkg.version
  },

  getPkgVersion: (name, n = 2) => {
    return pkg.dependencies[name].split('.').slice(0, n).join('.')
  },

  getLangNames: () => {
    const glob = require('glob')
    const path = require('path')
    const langsPath = path.resolve('./src/i18n/**/lang.json')

    return glob.sync(langsPath).reduce((obj, file) => {
      obj[file.split('/').slice(-2)[0]] = require(file)
      return obj
    }, {})
  },

  getInitialTexts: () => {
    const texts = require('./src/i18n/en/texts.json')

    const deepMapTexts = (filledTexts, cleanedTexts = {}) => {
      Object.keys(filledTexts).forEach(key => {
        const texts = filledTexts[key]
        cleanedTexts[key] = typeof texts === 'string' ? '' : deepMapTexts(texts)
      })
      return cleanedTexts
    }

    return deepMapTexts(texts)
  },

  getCSSVarValueByIndex: (index, ...values) => {
    return values[+index - 1] || values[0]
  },

  getCSSSafeAreaEnvValueBySide: (side, additionalValue) => {
    const env = `env(safe-area-inset-${side}, 0)`
    return additionalValue ? `calc(${env} + ${additionalValue})` : env
  },

  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production'
}
