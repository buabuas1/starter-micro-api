const Joi = require('joi');
const BlackListUser = require('../models/black.list.user.model');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  facebookUuid: Joi.string().required(),
  createdBy: Joi.string().required()
})

const bulkSchema = Joi.array().items(userSchema)

module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(req) {
  let user = req.body;
  user.createdBy = req.user._id.toString();
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  return await new BlackListUser(user).save();
}

async function insertBulk(req) {
  let users = req.body;
  for (let i = 0; i < users.length; i++) {
    users[i].createdBy = req.user._id.toString();
  }
  users = await Joi.validate(users, bulkSchema, {abortEarly: false});
  return BlackListUser.insertMany(users);
}

async function get(req) {
  let users = BlackListUser.find({'facebookUuid': req.query.facebookUuid}).select('-__v').sort({modifiedDate: -1});
  return users;
}
