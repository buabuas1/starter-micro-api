const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const ctrl = require('../controllers/room.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(getList));


async function insert(req, res) {
  let obj = await ctrl.insert(req.body);
  res.json(obj);
}

async function getList(req, res) {
  let arr = await ctrl.getList(req);
  res.json(arr);
}
