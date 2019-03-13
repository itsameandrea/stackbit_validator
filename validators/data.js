const fs = require('fs')
const yaml = require('js-yaml')
const { error } = require('../debuggers')

module.exports = async function (dirPath, file, allModels) {

  const dataModels = []

  for (prop in allModels) {
    if (allModels[prop].type === 'data') dataModels.push(allModels[prop])
  }

  const matchingModels = dataModels.filter((model) => {
    return model.type === 'data' && model.file === file.path
  })

  if (matchingModels.length !== 1) {
    error('You must have exactly one data model matching a data file')
  }

  validateData(dirPath, file, matchingModels[0])
}

function validateFields (file, fields) {
  fields.forEach(field => {
    if (field.required && !file[field.name])
      error(`The ${field} field is required in the data file`)
  })

  for (prop in file) {
    const matchingProp = fields.find((field) => field.name === prop)
    
    if (!matchingProp) {
      error(`${prop} should be defined in the data model`)
    }

    const propType = typeof(file[prop])

    if (matchingProp.type === 'list') {
      if (!Array.isArray(file[prop])) {
        error(`The type of ${prop} should match what's been defined in the data model`)
      }
    } else if (matchingProp.type === 'markdown') {
      if (propType !== 'string') {
        error(`The type of ${prop} should match what's been defined in the data model`)
      }
    } else if (propType !== matchingProp.type) {
      error(`The type of ${prop} should match what's been defined in the data model`)
    }

    if (Array.isArray(file[prop])) {
      file[prop].forEach((subFile) => validateFields(subFile, matchingProp.items.fields))
    }
  }
}

function validateData(dirPath, file, model) {
  try {
    const parsedFile = file.name.includes('.yml')
    ? yaml.safeLoad(fs.readFileSync(`${dirPath}/data/${file.path}`, 'utf8'))
    : JSON.parse(fs.readFileSync(`${dirPath}/data/${file.path}`))

    const fields = model.fields

    validateFields(parsedFile, fields)
  } catch (err) {
    error('Error while fetching data files')
    error(err.message)
  }
}