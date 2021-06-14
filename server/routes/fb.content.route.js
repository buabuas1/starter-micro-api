const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const fbCtrl = require('../controllers/fb.content.controller');

const router = express.Router();
module.exports = router;

router.route('/public/top/post')
  .get(asyncHandler(getTopPostChart));

router.route('/public/mark')
  .post(asyncHandler(markPostCommented));

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/bulk')
  .post(asyncHandler(insertBulk));

router.route('/mark')
  .post(asyncHandler(markPostCommented));

router.route('/unmark')
  .post(asyncHandler(unmarkPostCommented));

router.route('/chart')
  .get(asyncHandler(getChart));

router.route('/chart/top/post')
  .get(asyncHandler(getTopPostChart));

router.route('/')
  .get(asyncHandler(get));


async function insert(req, res) {
  let user = await fbCtrl.insert(req.body);
  res.json(user);
}

async function insertBulk(req, res) {
  let user = await fbCtrl.insertBulk(req.body);
  res.json(user);
}

async function get(req, res) {
  let user = await fbCtrl.get(req);
  res.json(user);
}

async function getChart(req, res) {
  let user = await fbCtrl.getGroupFindRoomChart(req);
  res.json(user);
}


async function getTopPostChart(req, res) {
  let user = await fbCtrl.getTopPostChart(req);
  res.json(user);
}

async function markPostCommented(req, res) {
  let user = await fbCtrl.markPostCommented(req.body);
  res.json(user);
}

async function unmarkPostCommented(req, res) {
  let user = await fbCtrl.markPostCommented(req.body);
  res.json(user);
}
