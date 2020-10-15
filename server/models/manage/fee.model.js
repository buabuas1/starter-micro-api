const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  price:  {
    type: Number,
    required: true
  },
  totalPrice:  {
    type: Number,
    required: true
  },
  quantity:  {
    type: Number,
    required: true
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
    required: true
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

const collectionName = 'Fee'
module.exports = mongoose.model(collectionName, FeeSchema, collectionName);
