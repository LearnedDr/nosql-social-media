
module.exports = {
      // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        // students,
        // headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}