const bcrypt = require('bcryptjs')

const encryptPassword = password => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}

const decryptPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  encryptPassword,
  decryptPassword
}