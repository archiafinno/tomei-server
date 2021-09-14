const { UserService } = require('../services')
const { UserSerializer } = require('../serializers')

class UserController {
  static async signUp(req, res, next) {
    let result = await UserService.signUp(req)
    if (result && result.status) {
      return res.status(201).json(UserSerializer.create(result.response))
    } 
    return next(result)
  }
}

module.exports = UserController;