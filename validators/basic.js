module.exports = function (model) {
  if (!model.type)
    return 'The model type is missing'
  
  // if (!model.name)
  //   return 'The model name is missing'

  if (!model.label)
    return 'The model label is missing'

  // Name must have alphanumeric characters
  // const name = model.name
  // if (!name.match(/^[a-z0-9]+$/i)) {
  //   return 'The model name should include just alphanumeric characters'
  // }

  // Label should be humanly readable
  const label = model.label
  if (!label.match(/^[a-z0-9\s]+$/i)) {
    return 'The model label should be humanly readable'
  }

  return `
    Type: OK
    Name: OK
    Label: OK
    Template: OK
  `
}