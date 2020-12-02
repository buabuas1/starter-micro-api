const Joi = require('joi');
const MemberTracking = require('../models/member.tracking.model');

const userSchema = Joi.object({
  createdByName: Joi.string().required(),
  createdByUuid: Joi.string().required(),
  userId: Joi.string().required(),
  groupId: Joi.string().required(),
})

module.exports = {
  insert,
  insertBulk,
  get
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  let userInDb = await MemberTracking.findOne({'userId': user.userId});
  userInDb = JSON.parse(JSON.stringify(userInDb));
  if (userInDb) {
    return 'Đã có người tạo bản ghi này';
  } else {
    return await new MemberTracking(user).save();
  }
}

async function insertBulk(users) {
  for (let i = 0; i < users.length; i++) {
    users[i] = await insert(users[i]);
  }
  return users;
}

async function get(req) {
  let users = MemberTracking.find().select('-__v').sort({createdDate: -1})
    .limit(parseInt(req.query.pageSize));
  return users;
}
