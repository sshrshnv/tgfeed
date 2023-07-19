const utils = require('./webpack.utils')

module.exports = {
  presets: [
    ['@babel/preset-env', {
      'modules': false,
      'bugfixes': true,
      'corejs': {
        'version': utils.getPkgVersion('core-js')
      },
      'useBuiltIns': 'usage',
    }],
    ['babel-preset-solid'],
    ['@babel/typescript'],
  ],
  plugins: utils.isDev() ? [
    ['solid-refresh/babel', {
      'bundler': 'webpack5'
    }]
  ] : []
}
