const utils = require('./build.utils')
const functions = require('./postcss.functions')

module.exports = {
  parser: 'sugarss',
  plugins: [
    ['postcss-easy-import', {
      extensions: '.sss'
    }],
    ['postcss-mixins'],
    ['postcss-functions', { functions }],
    ['postcss-nested'],
    ['postcss-simple-vars'],
    ...(utils.isProd() ? ['postcss-variable-compress/splitFiles.js'] : []),
    ['postcss-dark-theme-class', {
      darkSelector: '[data-theme="dark"]',
      lightSelector: '[data-theme="light"]'
    }],
    ['postcss-preset-env']
  ],
}
