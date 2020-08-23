const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const hostCtrl = require('../controllers/host.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(getList));


async function insert(req, res) {
  let obj = await hostCtrl.insert(req.body);
  res.json(obj);
}

async function getList(req, res) {
  let arr = await hostCtrl.getList(req.body);
  res.json(arr);
}
