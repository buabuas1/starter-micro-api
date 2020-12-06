const Joi = require('joi');
const ObjectId = require('mongoose').ObjectId;
const Member = require('../models/member.model');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
  isUsed: Joi.any(),
  usedByUuid: Joi.string(),
  usedByName: Joi.string()
})

const markSchema = Joi.object({
  ids: Joi.array().required(),
  usedByUuid: Joi.string().required(),
  usedByName: Joi.string().required()
})

const bulkSchema = Joi.array().items(userSchema)

module.exports = {
  insert,
  insertBulk,
  get,
  markIsUsed
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
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 200;

  let users = Member.find({'isUsed': {$ne: true}}).select('-__v').sort({"_id": -1})
    .limit(pageSize);
  return users;
}


async function markIsUsed(req) {
  await Joi.validate(req.body, markSchema, { abortEarly: false });
  const ids = req.body.ids;
  const usedByUuid = req.body.usedByUuid;
  const usedByName = req.body.usedByName;
  let users = Member.updateMany({userId: {$in: ids}}, { $set: {
      isUsed: true,
      usedByUuid: usedByUuid,
      usedByName: usedByName
  } })
  return users;
}
