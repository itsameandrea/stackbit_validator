let errors = null

function addError (name, description) {
  errors = {
    ...errors,
    [name]: description
  } 
}

module.exports.errors = errors
module.exports.addError = addError