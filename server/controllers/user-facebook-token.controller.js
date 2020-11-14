const Joi = require('joi');
const UserFacebookToken = require('../models/user-facebook-token.model');

const UserFacebookTokenSchema = Joi.object({
  createdDate: Joi.date(),
  userId: Joi.string().required(),
  getGroupFeedBody: Joi.string().required(),
  getRecentlyFriendBody: Joi.string().required(),
  getMemberOfGroupBody: Joi.string().required(),
  inviteFriendToGroupBody: Joi.string().required(),
  addFriendBody: Joi.string().required(),
  cookie: Joi.string().required(),
  token: Joi.string().required(),
  createdBy: Joi.string().required(),
  facebookUuid: Joi.string().required(),
  facebookName: Joi.string().required(),
})


module.exports = {
  insert,
  get,
  deleteUserFacebookToken
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

async function get(req) {
  let areas = UserFacebookToken.find({"userId": req.user._id}).select('-__v');
  return areas;
}

async function deleteUserFacebookToken(req) {
  let areas = await UserFacebookToken.deleteOne({'_id': req.params.id});
  return areas;
}
