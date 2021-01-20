const mongoose = require('mongoose');

const UserFacebookTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  getGroupFeedBody: {
    type: String,
    required: true
  },
  getRecentlyFriendBody: {
    type: String,
    required: true
  },
  getMemberOfGroupBody: {
    type: String,
    required: true
  },
  getMemberOfGroupSecondBody: {
    type: String,
    required: true
  },
  inviteFriendToGroupBody: {
    type: String,
    required: true
  },
  addFriendBody: {
    type: String,
    required: true
  },
  cookie: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  facebookUuid: {
    type: String,
    required: true
  },
  facebookName: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
  },
  position: {
    type: Number
  },
}, {
  versionKey: false
});

const collectionName = 'UserFacebookToken'
module.exports = mongoose.model(collectionName, UserFacebookTokenSchema, collectionName);
