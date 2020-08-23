const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
  Name : {
    type: String,
    required: true
  },
  RoomNumber : {
    type: Number
  },
  HouseNumber : {
    type: Number
  },
  ImageId: {
    type: String
  },
  ImageUrl: {
    type: String
  }
}, {
  versionKey: false
});

const collectionName = 'District'
module.exports = mongoose.model('District', DistrictSchema, collectionName);
