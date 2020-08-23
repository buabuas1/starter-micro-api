const bcrypt = require('bcrypt');
const Joi = require('joi');
const Host = require('../models/host.model');
const mongoose = require('mongoose');

const hostSchema = Joi.object({
  Phone: Joi.string().required(),
  Name: Joi.string().required()
})

module.exports = {
  insert,
  getList,
  getById
}

async function insert(host) {
  host = await Joi.validate(host, hostSchema, { abortEarly: false });
  return await new Host(host).save();
}

async function getList() {
  const arr = Host.find();
  return await arr;
}

async function getById(ids) {
  const obj_ids = ids.map(function(id) { return mongoose.Types.ObjectId(id); });
  const arr = Host.find({_id: {$in: obj_ids}});
  return await arr;
}
