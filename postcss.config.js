const utils = require('./build.utils')

module.exports = {
  parser: 'sugarss',
  plugins: [
    ['postcss-easy-import', {
      extensions: '.sss'
    }],
    ['postcss-mixins'],
    ['postcss-functions', {
      functions: {
        i: utils.getCSSVarValueByIndex,
        s: utils.getCSSSafeAreaEnvValueBySide,
      }
    }],
    ['postcss-nested'],
    ['postcss-simple-vars'],
    ...(utils.isProd() ? ['postcss-variable-compress/splitFiles.js'] : []),
    ['postcss-dark-theme-class', {
      darkSelector: '[data-theme="dark"]',
      lightSelector: '[data-theme="light"]'
    }],
    ['autoprefixer']
  ],
}
