const yaml = require('js-yaml')
const fs = require('fs')

function validateTheme (dirPath) {
  try {
    const contentModel = yaml.safeLoad(fs.readFileSync(`${dirPath}/content-model.yml`, 'utf8'))
  
    if (!contentModel) return 'content-model.yml is missing'

    // for (key in contentModel.models) {
    //   const model = contentModel.models[key]
    //   validateModel(dirPath, key, model)
    // }

    const dataDir = fs.readdirSync(`${dirPath}/data`).forEach(file => {
      console.log(file);
    })

  } catch (err) {
    console.log(err)
  }
}

function validateModel (dirPath, name, model) {
  const type = model.type
  console.log(`===== START VALIDATION ${name} ======`)
  
  console.log('Checking the basics...')
  console.log(require('./validators/basic')(model))
  
  if (type === 'page') {
    console.log('Checking the page configuration')
    console.log(require('./validators/page')(dirPath, model))  
  } else if (type === 'object') {
    console.log('Checking the object configuration')
    console.log(require('./validators/object')(dirPath, model))
  }
}

validateTheme('./models/reflex')