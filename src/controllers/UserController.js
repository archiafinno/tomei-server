const { UserService } = require('../services')

class UserController {
  static async signUp(req, res, next) {
    let result = await UserService.signUp(req)
    if (result && result.status) {
      return res.status(201).json(result.response)
    } 
    return next(result)
  }
}

module.exports = UserController;