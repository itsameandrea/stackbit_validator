const yaml = require('js-yaml')
const { promisify } = require('util')
const fs = require('fs')
const readdirp = promisify(require('readdirp'))
const { error } = require('../debuggers')

module.exports = async function (dirPath) {
  try {
    const module = {}
    
    const contentModel = yaml.safeLoad(fs.readFileSync(`${dirPath}/content-model.yml`, 'utf8'))
  
    let { files: dataFiles } = await readdirp({ root: `${dirPath}/data`})
    
    dataFiles = dataFiles.map((file) => ({
      name: file.name,
      path: file.path
    }))

    module.contentModel = contentModel
    module.dataFiles = dataFiles
    return module
  }
  catch (err) {
    error('Error while fetching content-model.yml.')
    error(err.message)

    process.exit(1)
  }
}