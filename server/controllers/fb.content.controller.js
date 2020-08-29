const bcrypt = require('bcrypt');
const Joi = require('joi');
const FbContent = require('../models/fb-content.model');

const fbContentSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string(),
  contentTypes: Joi.array(),
  costs: Joi.array(),
  numberCosts: Joi.array(),
  postTime: Joi.date(),
  url: Joi.string()
})

module.exports = {
  insert,
  get
}

async function insert(content) {
  content = await Joi.validate(content, fbContentSchema, { abortEarly: false });
  return await new FbContent(content).save();
}

async function get() {
  let users = FbContent.find({});
  return users;
}
