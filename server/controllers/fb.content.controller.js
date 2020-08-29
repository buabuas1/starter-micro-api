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

const bulkSchema = Joi.array().items(fbContentSchema)
module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(content) {
  content = await Joi.validate(content, fbContentSchema, { abortEarly: false });
  return await new FbContent(content).save();
}

async function insertBulk(content) {
  content = await Joi.validate(content.data, bulkSchema, { abortEarly: false });
  return await new Promise((resolve, reject) => {
    FbContent.insertMany(content, (error, docs) => {
        if (error) {
          reject(error);
        } else {
          resolve('Success!');
        }
    });
  })
}

async function get(request) {
  let users = FbContent.find({'postTime': {$gt: new Date(request.query.postTime)}});
  return users;
}
