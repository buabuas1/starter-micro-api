const Joi = require('joi');
const BlackListUser = require('../models/black.list.user.model');

const userSchema = Joi.object({
  userId: Joi.string().required(),
})


module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  return await new BlackListUser(user).save();
}

async function insertBulk(users) {
  for (let i = 0; i < users.length; i++) {
    users[i] = await insert(users[i]);
  }
  return users;
}

async function get() {
  let users = BlackListUser.find({}).sort({modifiedDate: -1}).limit(5);
  return users;
}
