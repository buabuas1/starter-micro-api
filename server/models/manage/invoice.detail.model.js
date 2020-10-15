const mongoose = require('mongoose');

const InvoiceDetailSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
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
  }
})

const collectionName = 'InvoiceDetail'
module.exports = mongoose.model(collectionName, InvoiceDetailSchema, collectionName);
