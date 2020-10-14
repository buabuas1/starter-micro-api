const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone:  {
    type: String,
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

const collectionName = 'Host'
module.exports = mongoose.model(collectionName, HostSchema, collectionName);
