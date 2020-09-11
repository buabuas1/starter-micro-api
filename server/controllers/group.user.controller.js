const Joi = require('joi');
const UserGroup = require('../models/group-user.model');
const R = require('ramda');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  groupIds: Joi.array().required(),
})


module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  let userInDb = await UserGroup.findOne({'userId': user.userId});
  userInDb = JSON.parse(JSON.stringify(userInDb));
  if (userInDb) {
    userInDb.groupIds = R.uniq(userInDb.groupIds.concat(user.groupIds));
    await UserGroup.updateOne({'userId': user.userId}, userInDb);
    return userInDb;
  } else {
    return await new UserGroup(user).save();
  }
}

async function insertBulk(users) {
  for (let i = 0; i < users.length; i++) {
    users[i] = await insert(users[i]);
  }
  return users;
}

async function get() {
  let users = UserGroup.find({});
  return users;
}
