const { User, sequelize } = require("../models");

class UserRepository {
  static async create(params) {
    try {
      return await User.create(params)
    } catch(err) {
      return Promise.reject(err)
    }
  }
}

module.exports = UserRepository;