const { error } = require('../debuggers')

module.exports = function (model) {

  if (!model.type)
    error('The model type is missing')

  if (!model.label)
    error('The model label is missing')

  // Name must have alphanumeric characters
  // const name = model.name
  // 
  // if (!name)
  //   error('The model name is missing')
  // if (!name.match(/^[a-z0-9]+$/i)) {
  //   error('The model name should include just alphanumeric characters')
  // }

  const label = model.label
  if (!label.match(/^[a-z0-9\s]+$/i)) {
    error('The model label should be humanly readable')
  }
}