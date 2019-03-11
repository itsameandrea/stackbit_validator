module.exports = async function (dirPath, model) {
  // The file property should be set for data models
  const filePath = model.file
  if (!filePath)
    return 'The file property is required for data models'
  
  // In the data directory there should be a file named as in in the file property
  const { dataFiles } = await require('../files')(dirPath)
  const file = dataFiles.find((file) => file.path === filePath)

  if (!file)
    return `The data file ${model.file} is missing in /data`

  return 'Data OK'
}