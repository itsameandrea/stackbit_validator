
const modelValidator = require('./model')
const { info } = require('../debuggers')

module.exports = async function validateTheme (dirPath) {
  const { contentModel } = await require('../files')(dirPath)
  const { dataFiles } = await require('../files')(dirPath)

  const dataValidator = await require('./data')

  for (key in contentModel.models) {
    const model = contentModel.models[key]
    modelValidator(dirPath, model)
  }

  dataFiles.forEach(async (file) => {
    dataValidator(dirPath, file, contentModel.models)
  })

  info('DONE')
}