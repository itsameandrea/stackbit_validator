const fs = require('fs')
const { error } = require('../debuggers')

module.exports = function (dirPath, model) {
  // Template should be defined for pages
  if (!model.template)
    error('The model template is missing')

  // If singleInstance = true
  // 1. file should be defined and should exist in /content
  // 2. folder, match and exclude shouldn't be defined
  const singleInstance = model.singleInstance
  if (singleInstance) {
    const file = model.file
    const folder = model.folder
    const match =  model.match
    const exclude = model.exclude

    if (!file) {
      error('The file property should be set for singleInstance models')
    }
      
    if (file && !fs.existsSync(`${dirPath}/content/${file}`)) {
      error('The file property is defined but the file is not present in /content')
    }
      
    if (folder) {
      error('The folder property should\'t be set for singleInstance models')
    }

    if (match) {
      error('The match property should\'t be set for singleInstance models')
    }
      
    if (exclude) {
      error('The exclude property should\'t be set for singleInstance models')
    } 
  }
}