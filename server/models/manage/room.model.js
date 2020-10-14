const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  houseId: {
    type: String,
    required: true,
  },
  createdBy: {
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

const collectionName = 'Room'
module.exports = mongoose.model(collectionName, RoomSchema, collectionName);
