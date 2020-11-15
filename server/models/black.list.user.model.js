const mongoose = require('mongoose');

const BlackListUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  facebookUuid: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'BlackListUser'
module.exports = mongoose.model(collectionName, BlackListUserSchema, collectionName);
