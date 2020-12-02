const Joi = require('joi');
const ObjectId = require('mongoose').ObjectId;
const Member = require('../models/member.model');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
})

const bulkSchema = Joi.array().items(userSchema)

module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  let userInDb = await Member.findOne({'userId': user.userId});
  userInDb = JSON.parse(JSON.stringify(userInDb));
  if (userInDb) {
    return userInDb;
  } else {
    return await new Member(user).save();
  }
}

async function insertBulk(users) {
  for (let i = 0; i < users.length; i++) {
    users[i] = await insert(users[i]);
  }
  return users;
}

async function get(req) {
  let start = 0;
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 200;
  if (req.query.pageNum && req.query.pageSize) {
    start = (parseInt(req.query.pageNum) - 1) * pageSize;
  }
  let users = Member.find({'_id': {$gt: req.query.cursor}}).select('-__v')
    .skip(start)
    .limit(pageSize);
  return users;
}
