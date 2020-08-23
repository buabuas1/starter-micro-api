const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  Url : {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

const collectionName = 'Image'
module.exports = mongoose.model(collectionName, ImageSchema, collectionName);
