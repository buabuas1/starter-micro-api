const mongoose = require('mongoose');

const MemberTrackingSchema = new mongoose.Schema({
  createdByName: {
    type: String,
    required: true,
  },
  createdByUuid: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  }
})

const collectionName = 'MemberTracking'
module.exports = mongoose.model(collectionName, MemberTrackingSchema, collectionName);
