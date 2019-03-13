export default async function (dirPath) {
  const { contentModel } = await require('./files')(dirPath)
  const { dataFiles } = await require('./files')(dirPath)

  if (!contentModel) return 'content-model.yml is missing'

  for (key in contentModel.models) {
    const model = contentModel.models[key]
    validateModel(dirPath, model, contentModel.models)
  }

  dataFiles.forEach(async (file) => {
    console.log(await require('./validators/data')(dirPath, file, contentModel.models))
  })
}