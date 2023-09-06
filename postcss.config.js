const utils = require('./webpack.utils')
const functions = require('./postcss.functions')

module.exports = {
  parser: 'sugarss',
  plugins: [
    ['postcss-easy-import', {
      extensions: '.sss'
    }],
    ['postcss-mixins'],
    ['postcss-functions', {
      functions
    }],
    ['postcss-nested'],
    ['postcss-simple-vars'],
    ['@csstools/postcss-global-data', {
      files: [
        './src/shared/ui/tokens/media.tokens.css'
      ]
    }],
    ['postcss-custom-media'],
    ...(utils.isProd() ? [['postcss-variable-compress/splitFiles.js', [
      variableName => variableName.startsWith('--js')
    ]]] : []),
    ['postcss-dark-theme-class', {
      darkSelector: '[data-theme-mode="dark"]',
      lightSelector: '[data-theme-mode="light"]'
    }],
    ['postcss-preset-env']
  ],
}
