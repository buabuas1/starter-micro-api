const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const memCtrl = require('../controllers/mem.controller');

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
  let user = await memCtrl.insert(req.body);
  res.json(user);
}

async function insertBulk(req, res) {
  let user = await memCtrl.insertBulk(req.body);
  res.json(user);
}

async function get(req, res) {
  let user = await memCtrl.get(req);
  res.json(user);
}
