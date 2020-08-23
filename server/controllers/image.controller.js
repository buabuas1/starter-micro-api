const bcrypt = require('bcrypt');
const Joi = require('joi');
const Image = require('../models/image.model');
const mongoose = require('mongoose');

const imageSchema = Joi.object({
  Url: Joi.string().required()
})

module.exports = {
  insert,
  getList
}

async function insert(img) {
  img = await Joi.validate(img, imageSchema, { abortEarly: false });
  return await new Image(img).save();
}

async function getList(imgIds) {
  const obj_ids = imgIds.map(function(id) { return mongoose.Types.ObjectId(id); });
  const arr = Image.find({_id: {$in: obj_ids}});
  return await arr;
}

