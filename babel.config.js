const utils = require('./webpack.utils')

module.exports = {
  presets: [
    ['@babel/preset-env', {
      'modules': false,
      'bugfixes': true,
      'corejs': utils.getPkgVersion('core-js'),
      'useBuiltIns': 'entry',
    }],
    ['babel-preset-solid'],
    ['@babel/typescript'],
  ],
  plugins: utils.isDev() ? [
    'solid-refresh/babel',
  ] : []
}
