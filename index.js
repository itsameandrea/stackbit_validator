async function validateTheme (dirPath) {
  const { contentModel } = await require('./files')(dirPath)
  const { dataFiles } = await require('./files')(dirPath)

  if (!contentModel) return 'content-model.yml is missing'

  for (key in contentModel.models) {
    const model = contentModel.models[key]
    validateModel(dirPath, model, contentModel.models)
  }

  dataFiles.forEach(async (file) => {
    // await require('./validators/data')(dirPath, file, contentModel.models)
    console.log(await require('./validators/data')(dirPath, file, contentModel.models))
  })
}

function validateModel (dirPath, model) {
  const type = model.type

  console.log('Checking the basics...')
  console.log(require('./validators/basic')(model))
  
  if (type === 'page') {
    console.log('Checking the page configuration')
    console.log(require('./validators/page')(dirPath, model))  
  } else if (type === 'object') {
    console.log('Checking the object configuration')
    console.log(require('./validators/object')(dirPath, model))
  }
  // } else if (type === 'data') {
  //   console.log('Checking the data configuration')
  //   console.log(await require('./validators/data')(dirPath, model, allModels))
  // }
}

validateTheme('./models/reflex')