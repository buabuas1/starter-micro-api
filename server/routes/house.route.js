const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const houseCtrl = require('../controllers/house.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(getList));


async function insert(req, res) {
  let house = await houseCtrl.insert(req.body);
  res.json(house);
}

async function getList(req, res) {
  let houses = await houseCtrl.getList(req);
  res.json(houses);
}
