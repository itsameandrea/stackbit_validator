const fs = require('fs')
const yaml = require('js-yaml')

module.exports = async function (dirPath, file, allModels) {

  const dataModels = []

  for (prop in allModels) {
    if (allModels[prop].type === 'data') dataModels.push(allModels[prop])
  }

  const matchingModels = dataModels.filter((model) => {
    return model.type === 'data' && model.file === file.path
  })

  if (matchingModels.length !== 1)
    return 'You must have exactly one data model matching a data file'
  else
    console.log('Model file matching data model')

  validateData(dirPath, file, matchingModels[0])
}

function validateFields (file, fields) {
  fields.forEach(field => {
    if (field.required && !file[field.name])
      console.log(`The ${field} field is required in the data file`)
  })

  for (prop in file) {
    const matchingProp = fields.find((field) => field.name === prop)
    if (!matchingProp)
      console.log(`${prop} should be defined in the data mdel`)

    const propType = typeof(file[prop])

    if (matchingProp.type === 'list') {
      if (!Array.isArray(file[prop])) {
        console.log(`The type of ${prop} should match what's been defined in the data model`)
      }
    } else if (matchingProp.type === 'markdown') {
      if (propType !== 'string') {
        console.log(`The type of ${prop} should match what's been defined in the data model`)
      }
    } else if (propType !== matchingProp.type) {
      console.log(`The type of ${prop} should match what's been defined in the data model`)
    }

    if (Array.isArray(file[prop])) {
      file[prop].forEach((subFile) => validateFields(subFile, matchingProp.items.fields))
    }
  }
}

function validateData(dirPath, file, model) {
  const parsedFile = file.name.includes('.yml')
    ? yaml.safeLoad(fs.readFileSync(`${dirPath}/data/${file.path}`, 'utf8'))
    : JSON.parse(fs.readFileSync(`${dirPath}/data/${file.path}`))

  const fields = model.fields

  validateFields(parsedFile, fields)
}