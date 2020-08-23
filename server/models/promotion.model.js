const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  Url: {
    type: String,
    required: true
  },
  ImageUrl: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Condition: {
    type: String,
    required: true
  },
  StartTime: {
    type: Date,
    required: true
  },
  EndTime: {
    type: Date,
    required: true
  },
}, {
  versionKey: false
});

const collectionName = 'Promotion'
module.exports = mongoose.model(collectionName, PromotionSchema, collectionName);
