const fs = require('fs')

module.exports = function (dirPath, model) {
  // Template should be defined for pages
  if (!model.template)
  return 'The model template is missing'

  // If singleInstance = true
  // 1. file should be defined and should exist in /content
  // 2. folder, match and exclude shouldn't be defined
  const singleInstance = model.singleInstance
  if (singleInstance) {
    const file = model.file
    const folder = model.folder
    const match =  model.match
    const exclude = model.exclude

    if (!file)
      return 'The file property should be set for singleInstance models'

    if (file && !fs.existsSync(`${dirPath}/content/${file}`))
      return 'The file property is defined but the file is not present in /content'
    
    if (folder)
      return 'The folder property should\'t be set for singleInstance models'

    if (match)
      return 'The match property should\'t be set for singleInstance models'

    if (exclude)
      return 'The exclude property should\'t be set for singleInstance models'

    return 'Page OK'
  } 
}