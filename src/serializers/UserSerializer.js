class UserSerializer {
  static create(params) {
    if (params) {
      return {
        id: params.id,
        name: params.name,
        email: params.email,
        avatar: params.avatar
      }
    }
    return null
  }
}

module.exports = UserSerializer;