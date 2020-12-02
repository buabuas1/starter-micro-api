const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const memTrackingCtrl = require('../controllers/mem.tracking.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/bulk')
  .post(asyncHandler(insertBulk));

router.route('/')
  .get(asyncHandler(get));


async function insert(req, res) {
  let user = await memTrackingCtrl.insert(req.body);
  if (typeof user  === 'string') {
    res.status(400).send({
      message: user
    })
  }
  res.json(user);
}

async function insertBulk(req, res) {
  let user = await memTrackingCtrl.insertBulk(req.body);
  res.json(user);
}

async function get(req, res) {
  let user = await memTrackingCtrl.get(req);
  res.json(user);
}
