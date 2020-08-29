const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const fbCtrl = require('../controllers/fb.content.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(get));


async function insert(req, res) {
  let user = await fbCtrl.insert(req.body);
  res.json(user);
}

async function get(req, res) {
  let user = await fbCtrl.get(req.body);
  res.json(user);
}
