const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hostId: {
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

const collectionName = 'House'
module.exports = mongoose.model(collectionName, HouseSchema, collectionName);
