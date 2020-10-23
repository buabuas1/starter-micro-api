const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price:  {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
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

const collectionName = 'Product'
module.exports = mongoose.model(collectionName, ProductSchema, collectionName);
