module.exports = function (dirPath, model) {
  const label = model.label

  // Label should be defined
  if (!label)
    return 'The label property should be defined for object models'
  
  return 'Object OK'
}