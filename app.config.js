const pkg = require('./package.json')
const utils = require('./app.utils')

const APP_VERSION = pkg.version

const APP_TITLE = 'TgFeed'
const APP_DESCRIPTION = 'Telegram channel feed'

const APP_THEME_MODES = ['system', 'light', 'dark']
const APP_DEFAULT_THEME_MODE = APP_THEME_MODES[0]
//const APP_THEME_COLORS = { splash: '#3A4E7E', light: '#E3E9F7', dark: '#16191F' }
const APP_THEME_COLORS = { splash: '#3A4E7E', light: '#E3E9F7', dark: '#1D2129' }
const APP_DEFAULT_THEME_COLOR = APP_THEME_COLORS['splash']

const APP_LOCALE_LANGS = utils.getLocaleLangs()
const APP_DEFAULT_LOCALE_LANG = 'en'

module.exports = {
  APP_VERSION,

  APP_TITLE,
  APP_DESCRIPTION,

  APP_THEME_MODES,
  APP_DEFAULT_THEME_MODE,
  APP_THEME_COLORS,
  APP_DEFAULT_THEME_COLOR,

  APP_LOCALE_LANGS,
  APP_DEFAULT_LOCALE_LANG
}
