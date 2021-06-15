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
  url: Joi.string(),
  commentCount: Joi.number(),
  groupId: Joi.string(),
  authorId: Joi.string(),
  phone: Joi.any(),
  isComment: Joi.any(),
  parentContent: Joi.any(),
})

const bulkSchema = Joi.array().items(fbContentSchema)

const findRoomConst = 'TIM_PHONG';
const FOR_RENT = 'CHO_THUE_PHONG';
module.exports = {
  insert,
  insertBulk,
  get,
  getGroupFindRoomChart,
  getTopPostChart,
  markPostCommented,
  getCommentPerUserChart
}

async function insert(content) {
  content = await Joi.validate(content, fbContentSchema, {abortEarly: false});
  return await new FbContent(content).save();
}

async function insertBulk(content) {
  content = await Joi.validate(content.data, bulkSchema, {abortEarly: false});
  return await new Promise((resolve, reject) => {
    try {
      content.forEach(async (c, i) => {
        await FbContent.findOneAndUpdate({'id': c.id}, c, {upsert: true, setDefaultsOnInsert: true, new: true, new: true})
      })
    } catch (e) {
      reject(error);
    }
    resolve('Success!');
  })
}

async function get(request) {
  let query = {
    'postTime': {$gte: new Date(request.query.postTime)},
  }
  if (request.query.groupIds && request.query.groupIds.length > 0) {
    query.groupId = {$in: request.query.groupIds.split(',')};
  }
  if (request.query.createdDate) {
    query.createdDate = {$gte: new Date(request.query.createdDate)};
  }
  let users = FbContent.find(query).sort({_id: -1});
  return users;
}

async function getGroupFindRoomChart(request) {
  let rs = FbContent.aggregate([
    // First Stage
    {
      $match: {
        $and: [
          {contentTypes: {$elemMatch: {$eq: findRoomConst}}},
          {postTime: {$gte: new Date(request.query.postTime)}}
        ]
      }
    },
    {
      $group:
        {
          _id: "$groupId",
          totalPost: {$sum: 1}
        }
    },
    {
      $sort: {totalPost: -1}
    },
    {$limit: request.query.limit ? parseInt(request.query.limit) : 10}
  ]);
  return rs;
}


async function getTopPostChart(request) {
  const arrStatus = (request.query.commentStatus || '').split(',').map(c => parseInt(c));
  let aggregate = [
    {postTime: {$gte: new Date(request.query.postTime)}},
    {commentStatus: { $in: arrStatus }},
    {isComment: false},
  ];
  if (request.query.type) {
      aggregate = [
      {contentTypes: {$elemMatch: {$eq: request.query.type}}},
      {postTime: {$gte: new Date(request.query.postTime)}},
      {commentStatus: { $in: arrStatus }},
      {isComment: false},
    ];
  }
  let rs = FbContent.aggregate([
    // First Stage
    {
      $match: {
        $and: aggregate
      }
    },
    {
      $sort: {commentCount: -1}
    },
    {$limit: request.query.limit ? parseInt(request.query.limit) : 10}
  ]);
  return rs;
}


async function markPostCommented(body) {
  let postContent = await FbContent.findOne({'id': body.id});
  postContent = JSON.parse(JSON.stringify(postContent));
  postContent.commentStatus = body.status;
  postContent.modifiedDate = new Date();
  postContent.modifiedBy = body.modifiedBy;
  return new Promise(async (resolve, reject) => {
    try {
        await FbContent.findOneAndUpdate({'id': postContent.id}, postContent, {upsert: true, setDefaultsOnInsert: true, new: true, new: true})
    } catch (e) {
      reject(error);
    }
    resolve('Success!');
  })
}

async function getCommentPerUserChart(request) {
  const arrStatus = (request.query.commentStatus || '').split(',').map(c => parseInt(c));
  let rs = FbContent.aggregate([
    // First Stage
    {
      $match: {
        $and: [
          {modifiedDate: {$gte: new Date(request.query.postTime)}},
          {commentStatus: { $in: arrStatus }},
          {modifiedBy: { $ne: null }},
        ]
      }
    },
    {
      $group:
        {
          _id: "$modifiedBy",
          totalPost: {$sum: 1}
        }
    },
    {
      $lookup:
        {
          from: "UserFacebookToken",
          localField: "_id",
          foreignField: "facebookUuid",
          as: "user"
        }
    },
    {
      $sort: {totalPost: -1}
    },
    {$limit: request.query.limit ? parseInt(request.query.limit) : 10}
  ]);
  return rs;
}
