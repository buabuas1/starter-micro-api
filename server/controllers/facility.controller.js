const bcrypt = require('bcrypt');
const Joi = require('joi');
const Facility = require('../models/facility.model');

const facilitySchema = Joi.object({
  Type: Joi.string().required(),
  Name: Joi.string().required()
})

module.exports = {
  insert,
  getList
}

async function insert(facility) {
  facility = await Joi.validate(facility, facilitySchema, { abortEarly: false });
  return await new Facility(facility).save();
}

async function getList() {
  const arr = Facility.find();
  return await arr;
}

