const mongoose = require('mongoose');

const GroupUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  groupIds: [{
    type: String,
    required: true,
  }],
  createdDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'GroupUser'
module.exports = mongoose.model(collectionName, GroupUserSchema, collectionName);
