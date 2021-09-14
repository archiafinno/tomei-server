const { UserRepository } = require('../repositories')

class UserService {
  static async signUp(params) {
    const { name, email, password } = params.body;
    if(!params.file) {
      return {
        name: "BadRequest",
        errors: { message: "Avatar is required" }
      };
    }

    try {
      const avatar = `avatar/${params.file.filename}`
      const user = await UserRepository.create({ name, email, password, avatar });

      return {
        status: true,
        response: user
      }
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserService;