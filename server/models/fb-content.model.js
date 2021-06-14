const mongoose = require('mongoose');
export const COMMENT_STATUS = {NEW: 1, ISSUE: 2, SUCCESS: 3};
const FbContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  contentTypes: [{
    type: String
  }],
  costs: [{
    type: String
  }],
  numberCosts: [{
    type: Number
  }],
  postTime: {
    type: Date
  },
  url: {
    type: String,
  },
  groupId: {
    type: String,
  },
  commentCount: {
    type: Number,
  },
  authorId: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String,
  },
  isComment: {
    type: Boolean,
    default: false
  },
  parentContent: {
    type: String,
  },
  commentStatus: {
    type: Number,
    default: COMMENT_STATUS.NEW
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  modifiedBy: {
    type: String,
  },
})

const collectionName = 'FbBDSContent'
module.exports = mongoose.model(collectionName, FbContentSchema, collectionName);
