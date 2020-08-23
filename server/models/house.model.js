const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  DistrictId : {
    type: String,
    required: true
  },
  HostId : {
    type: String
  },
  Name : {
    type: String,
    required: true
  },
  Address : {
    type: String,
  },
  RoomNumber : {
    type: Number
  },
  AvatarId: {
    type: String,
  },
  AvatarUrl: {
    type: String,
  },
}, {
  versionKey: false
});

const collectionName = 'House'
module.exports = mongoose.model('House', HouseSchema, collectionName);
