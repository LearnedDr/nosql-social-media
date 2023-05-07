const User = require('../models/User')

module.exports = {
  async getUsers(req, res) {
    console.log("line 5 getUser", res)
    try {
      const users = await User.find();


      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    console.log("line 17 getSingleUser", res)
    try {
      const oneUser = await User.findOne({ _id: ObjectId(req.params.userId) })
        .populate({ path: 'friends', select: 'username email' });
      const oneFriend = await User.findOne({
        _id: ObjectId(req.params.friendId)
      });
      if (oneFriend || oneUser) {
        return res.status(200).json(oneFriend || oneUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    console.log("line 33 createUser", res)
    try {
      const newUser = new User(
        {
          username: req.body.username,
          email: req.body.email
        });
      await newUser.save();
      if (newUser) {
        res.status(200).json(newUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err, { message: 'Unable to create new user. Please try again.' });
    }
  },
  async updateUser(req, res) {
    console.log("line 50 updateUser", res)
    try {
      const updatedUser = await User.findOneAndUpdate({
        _id: ObjectId(req.params.userId)
      },
        {
          username: req.body.username,
          email: req.body.email
        },
        {
          new: true
        });
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    console.log("line 71 deleteUser", res)
    try {
      const deletedUser = await User.findOneAndDelete({ _id: ObjectId(req.params.userId) }, { rawResult: true });
      const deletedUsername = deletedUser.value.username;
      const deletedThoughtsByUser = await Thought.deleteMany({ username: deletedUsername }, { rawResult: true });
      if (deletedUser && deletedThoughtsByUser) {
        return res.status(200).json({ message: "User deleted!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    console.log("line 85 addFriend", res)
    try {
      const addedFriend = await User.findOneAndUpdate({
        _id: ObjectId(req.params.userId)
      },
        {
          $addToSet: { friends: ObjectId(req.params.friendId) }
        },
        {
          new: true
        });
      if (addedFriend) {
        return res.status(200).json(addedFriend);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    console.log("line removeFriend", res)
    try {
      const deletedFriend = await User.findOneAndUpdate({
        _id: ObjectId(req.params.userId)
      },
        {
          $pull: { friends: ObjectId(req.params.friendId) }
        },
        {
          new: true
        });
      if (deletedFriend) {
        return res.status(200).json(deletedFriend);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
