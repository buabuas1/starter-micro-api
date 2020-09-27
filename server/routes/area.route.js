const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const areaCtrl = require('../controllers/area.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(get));


async function insert(req, res) {
  let area = await areaCtrl.insert(req);
  res.json(area);
}

async function get(req, res) {
  let area = await areaCtrl.get(req);
  res.json(area);
}
