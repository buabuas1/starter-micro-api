const Joi = require('joi');
const UserFriend = require('../models/user-friend.model');
const R = require('ramda');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  friendIds: Joi.array().required(),
})


module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  let userInDb = await UserFriend.findOne({'userId': user.userId});
  userInDb = JSON.parse(JSON.stringify(userInDb));
  if (userInDb) {
    userInDb.friendIds = R.uniq(userInDb.friendIds.concat(user.friendIds));
    await UserFriend.updateOne({'userId': user.userId}, userInDb);
    return userInDb;
  } else {
    return await new UserFriend(user).save();
  }
}

async function insertBulk(users) {
  for (let i = 0; i < users.length; i++) {
    users[i] = await insert(users[i]);
  }
  return users;
}

async function get() {
  let users = UserFriend.find({});
  return users;
}
