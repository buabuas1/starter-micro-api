const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const fbContentRoutes = require('./fb.content.route');
const groupUserRoutes = require('./group.user.route');
const userFriendRoutes = require('./user.friend.route');
const blackListUserRoutes = require('./black.list.user.route');
const areaRoutes = require('./area.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/fbcontent', fbContentRoutes);
router.use('/group/user', groupUserRoutes);
router.use('/user/friend', userFriendRoutes);
router.use('/blacklist', blackListUserRoutes);
router.use('/area', areaRoutes);

module.exports = router;
