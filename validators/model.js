const basicValidator = require('./basic')
const pageValidator = require('./page')
const objectValidator = require('./object')

module.exports = function validateModel (dirPath, model) {
  const type = model.type

  basicValidator(model)
  
  if (type === 'page') {
    pageValidator(dirPath, model)  
  } else if (type === 'object') {
    objectValidator(dirPath, model)
  }
}