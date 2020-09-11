const mongoose = require('mongoose');

const UserFriendSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  friendIds: [{
    type: String,
    required: true,
  }],
  createdDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'UserFriend'
module.exports = mongoose.model(collectionName, UserFriendSchema, collectionName);
