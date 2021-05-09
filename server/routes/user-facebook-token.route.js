const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userFacebookTokenCtrl = require('../controllers/user-facebook-token.controller');

const router = express.Router();
module.exports = router;

router.route('/savetoken')
  .post(asyncHandler(saveToken));

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(get));

router.route('/:id')
  .delete(asyncHandler(deleteArea));


async function insert(req, res) {
  let area = await userFacebookTokenCtrl.insert(req);
  res.json(area);
}

async function get(req, res) {
  let area = await userFacebookTokenCtrl.get(req);
  res.json(area);
}

async function deleteArea(req, res) {
  let area = await userFacebookTokenCtrl.deleteUserFacebookToken(req);
  res.json(area);
}

async function saveToken(req, res) {
  let area = await userFacebookTokenCtrl.saveToken(req);
  res.json(area);
}

