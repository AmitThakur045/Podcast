const UserModel = require("../models/user.model");

class UserService {
  async findUser(filter) {
    let user = await UserModel.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }
}

module.exports = new UserService();
