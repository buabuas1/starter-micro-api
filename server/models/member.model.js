const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  groupId: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'Member'
module.exports = mongoose.model(collectionName, MemberSchema, collectionName);
