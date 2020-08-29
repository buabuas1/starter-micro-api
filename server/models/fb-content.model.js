const mongoose = require('mongoose');

const FbContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  contentTypes: [{
    type: String
  }],
  costs: [{
    type: String
  }],
  numberCosts: [{
    type: Number
  }],
  postTime: {
    type: Date
  },
  url: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'FbBDSContent'
module.exports = mongoose.model(collectionName, FbContentSchema, collectionName);
