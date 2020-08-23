const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  Type : {
    type: Number,
    required: true
  },
  Name : {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

const collectionName = 'Facility'
module.exports = mongoose.model('Facility', FacilitySchema, collectionName);
