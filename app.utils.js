const getLocaleLangs = () => {
  const glob = require('glob')
  const path = require('path')
  const localeLangsPath = path.resolve('./src/shared/ui/locales/*.json')

  return glob.sync(localeLangsPath).map(file => {
    const pathParts = file.split('/')
    const localeLang = pathParts.at(-1).split('.')[0]
    return localeLang
  }).reverse()
}

module.exports = {
  getLocaleLangs
}
