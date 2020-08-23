const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
  Phone : {
    type: String,
    required: true
  },
  Name : {
    type: String,
    required: true
  },
  PriceFrom: {
    type: Number
  },
  PriceTo: {
    type: Number
  }
}, {
  versionKey: false
});

const collectionName = 'Host'
module.exports = mongoose.model('Host', HostSchema, collectionName);
