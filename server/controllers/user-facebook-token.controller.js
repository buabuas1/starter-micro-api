const Joi = require('joi');
const UserFacebookToken = require('../models/user-facebook-token.model');

const UserFacebookTokenSchema = Joi.object({
  createdDate: Joi.date(),
  userId: Joi.string().required(),
  getGroupFeedBody: Joi.string(),
  getRecentlyFriendBody: Joi.string(),
  getMemberOfGroupBody: Joi.string(),
  getMemberOfGroupSecondBody: Joi.string(),
  inviteFriendToGroupBody: Joi.string(),
  addFriendBody: Joi.string(),
  cookie: Joi.string().required(),
  agent: Joi.string().required(),
  token: Joi.string().required(),
  createdBy: Joi.string().required(),
  facebookUuid: Joi.string().required(),
  facebookName: Joi.string().required(),
  position: Joi.number()
})


module.exports = {
  insert,
  get,
  deleteUserFacebookToken,
  saveToken
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  area.userId = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, UserFacebookTokenSchema, { abortEarly: false });
    return await UserFacebookToken.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true, new: true})
  } else {
    area = await Joi.validate(area, UserFacebookTokenSchema, { abortEarly: false });
    return await new UserFacebookToken(area).save();
  }
}

async function saveToken(req) {
  let data = req.body;

  if (data.userId) {
    let info = await UserFacebookToken.findOne({"facebookUuid": data.userId});
    info  = JSON.parse(JSON.stringify(info));
    info.cookie = data.cookie;
    info.token = data.token;
    return await UserFacebookToken.findByIdAndUpdate(info._id, info, {upsert: true, setDefaultsOnInsert: true, new: true})
  } else {
    return 'User không tồn tại';
  }
}

async function get(req) {
  let areas = UserFacebookToken.find({"userId": req.user._id}).select('-__v');
  return areas;
}

async function deleteUserFacebookToken(req) {
  let areas = await UserFacebookToken.deleteOne({'_id': req.params.id});
  return areas;
}
