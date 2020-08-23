const bcrypt = require('bcrypt');
const Joi = require('joi');
const District = require('../models/district.model');
const imgCtrl = require('./image.controller');
const mongoose = require('mongoose');

const districtSchema = Joi.object({
  Name: Joi.string().required(),
  RoomNumber: Joi.number(),
  HouseNumber: Joi.number(),
  ImageUrl: Joi.string().required(),
  _id: Joi.string(),
  ImageId: Joi.string()
})

const option = {upsert: true, new: true};

module.exports = {
  insert,
  getList
}

async function insert(req, res) {
  let district = Joi.validate(req.body, districtSchema, { abortEarly: false });
  if (district.error && district.error.message) {
    return res.send(500, {error: district.error.message});
  }
  try {
    let result = await District.findOneAndUpdate({_id: mongoose.Types.ObjectId(district.value._id)}, district.value, option);
    return res.json(result);
  } catch (e) {
    return res.send(500, {error: e});
  }

}

async function getList() {
  let districts = await District.find();
  districts = JSON.parse(JSON.stringify(districts));
  const imgIds = districts.map((d) => {
    return d.ImageId;
  })
  let imgs = await imgCtrl.getList(imgIds);
  imgs = JSON.parse(JSON.stringify(imgs));
  districts = districts.map((d) => {
    const img = imgs.find(i => i._id === d.ImageId);
    if (!img) {
      return d;
    } else {
      return {...d, ImageUrl: img.Url}
    }

  })
  return districts;
}

