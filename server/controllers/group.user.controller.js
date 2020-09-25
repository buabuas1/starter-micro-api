const Joi = require('joi');
const UserGroup = require('../models/group-user.model');
const R = require('ramda');
const http = require('http');
const config = require('../config/config');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  groupIds: Joi.array().required(),
})


module.exports = {
  insert,
  insertBulk,
  get,
  getPhoneByUid
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  let userInDb = await UserGroup.findOne({'userId': user.userId});
  userInDb = JSON.parse(JSON.stringify(userInDb));
  if (userInDb) {
    userInDb.groupIds = R.uniq(userInDb.groupIds.concat(user.groupIds));
    userInDb.modifiedDate = new Date();
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
  let users = UserGroup.find({}).sort({modifiedDate: -1}).limit(5);
  return users;
}


async function getPhoneByUid(request) {
  const uid = request.query.uid;
  const token = config.toolKitKey;
  return new Promise((resolve, reject) => {
    let options = {
      host: `api.vltoolkit.com`,
      path: `/api/Convert?uid=${uid}&apikey=${token}`
    };

    let req = http.get(options, function(res) {
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));

      // Buffer the body entirely for processing as a whole.
      let bodyChunks = [];
      res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function() {
        let body = Buffer.concat(bodyChunks);
        // console.log('BODY1: ' + body);
        // ...and/or process the entire body here.
        resolve(body.toString('utf-8'));
      })
    });

    req.on('error', function(e) {
      console.log('ERROR: ' + e.message);
      reject(e);
    });
  })
}
