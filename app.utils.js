const getLocaleLangs = () => {
  const glob = require('glob')
  const path = require('path')
  const localeLangsPath = path.resolve('./src/shared/locales/*.json')

  return glob.sync(localeLangsPath).map(file => {
    const pathParts = file.split('/')
    const localeLang = pathParts[pathParts.length - 1].split('.')[0]
    return localeLang
  })
}

module.exports = {
  getLocaleLangs
}
