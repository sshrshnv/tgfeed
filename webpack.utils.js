module.exports = {
  getLangNames: () => {
    const glob = require('glob')
    const path = require('path')
    const langsPath = path.resolve('./src/i18n/texts/**/lang.json')

    return glob.sync(langsPath).reduce((obj, file) => ({
      ...obj,
      [file.split('/').slice(-2)[0]]: require(file)
    }), {})
  },

  getInitialTexts: () => {
    const texts = require('./src/i18n/texts/en/texts.json')

    const deepMapTexts = (filledTexts, cleanedTexts = {}) => {
      Object.keys(filledTexts).forEach(key => {
        const texts = filledTexts[key]
        cleanedTexts[key] = typeof texts === 'string' ? '' : deepMapTexts(texts)
      })
      return cleanedTexts
    }

    return deepMapTexts(texts)
  }
}
