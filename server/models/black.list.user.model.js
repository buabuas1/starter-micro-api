const mongoose = require('mongoose');

const BlackListUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
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

const collectionName = 'BlackListUser'
module.exports = mongoose.model(collectionName, BlackListUserSchema, collectionName);
