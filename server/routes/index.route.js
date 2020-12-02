const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const fbContentRoutes = require('./fb.content.route');
const groupUserRoutes = require('./group.user.route');
const userFriendRoutes = require('./user.friend.route');
const blackListUserRoutes = require('./black.list.user.route');
const areaRoutes = require('./area.route');
const hostRoutes = require('./manage/host.route');
const houseRoutes = require('./manage/house.route');
const roomRoutes = require('./manage/room.route');
const invoiceRoutes = require('./manage/invoice.route');
const customerRoutes = require('./manage/customer.route');
const productRoutes = require('./manage/product.route');
const feeRoutes = require('./manage/fee.route');
const fbTokenRoutes = require('./user-facebook-token.route');
const memberRoute = require('./member.route');
const memberTrackingRoute = require('./member.tracking.route');

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
router.use('/host', hostRoutes);
router.use('/house', houseRoutes);
router.use('/room', roomRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/customer', customerRoutes);
router.use('/product', productRoutes);
router.use('/fee', feeRoutes);
router.use('/fbtoken', fbTokenRoutes);
router.use('/member', memberRoute);
router.use('/tracking', memberTrackingRoute);

module.exports = router;
