const User = require('../models/User')

const userController = {
      // Get all users
  async getUsers(req, res) {
    console.log("line 6 userController", res)
    try {
      const users = await User.find();
      

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}

module.exports = userController