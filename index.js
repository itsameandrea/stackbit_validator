

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