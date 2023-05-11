/*
  Intellisense support for CSS Variables

  Visual Studio Code extension:
    https://github.com/willofindie/vscode-cssvar

  Extension settings:
    "cssvar.postcssSyntax": {
      "sugarss": ["sss"]
    },
    "cssvar.files": [
      "./src/shared/tokens/*.sss"
    ],
    "files.associations": {
      "*.sss": "sass"
    },
    "cssvar.postcssPlugins": [
      "postcss-easy-import",
      "postcss-mixins",
      "postcss-nested"
    ],
    "cssvar.excludeThemedVariables": true
*/

/*
  Intellisense support for CSS Modules

  Typescript plugin:
    https://github.com/mrmckeb/typescript-plugin-css-modules
*/

const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const sugarss = require('sugarss')

module.exports = (css) => {
  return postcss([postcssNested]).process(css, { parser: sugarss }).css
}
