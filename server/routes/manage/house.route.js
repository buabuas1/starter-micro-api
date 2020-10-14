const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const houseCtrl = require('../../controllers/manage/house.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(get));

router.route('/:id')
  .delete(asyncHandler(deleteArea));


async function insert(req, res) {
  let area = await houseCtrl.insert(req);
  res.json(area);
}

async function get(req, res) {
  let area = await houseCtrl.get(req);
  res.json(area);
}

async function deleteArea(req, res) {
  let area = await houseCtrl.deleteHouse(req);
  res.json(area);
}

