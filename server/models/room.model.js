const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  HouseId : {
    type: String,
    required: true
  },
  Name : {
    type: String,
    required: true
  },
  Square : {
    type: Number,
    required: true
  },
  Facilities: {
    type: Array
  },
  Images: {
    type: Array
  },
  AvatarId: {
    type: String
  },
  AvatarUrl: {
    type: String
  },
  PriceFrom: {
    type: Number
  },
  PriceTo: {
    type: Number
  },
  ElectricPrice: {
    type: Number
  },
  WaterPrice: {
    type: Number
  },
  InternetPrice: {
    type: Number
  },
  Description: {
    type: String
  },
  Position: {
    type: Number
  },
  IsActive: {
    type: Boolean
  },
}, {
  versionKey: false
});

const collectionName = 'Room'
module.exports = mongoose.model(collectionName, RoomSchema, collectionName);
