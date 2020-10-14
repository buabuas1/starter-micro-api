const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
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

const collectionName = 'Customer'
module.exports = mongoose.model(collectionName, CustomerSchema, collectionName);
